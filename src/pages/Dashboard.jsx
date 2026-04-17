import { Navigate, useNavigate } from 'react-router-dom';
import projectImage from '/assets/project-image.png';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import Loading from '../components/ui/Loading';
import { useProjects } from '../hooks/useProject';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IoIosTimer } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { formatDateTime } from '../utils/formatDateTime';

const BASE_URL = 'http://localhost:3000/api';

const Dashboard = () => {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const { projects, loading, createProject, deleteProject } = useProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (data) => {
        const newProject = await createProject(data);
        await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ projectId: newProject._id, historyData: newProject })
        })
        setIsModalOpen(false);
        navigate(`/editor/${newProject.slug}`);
    };

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (loading) return <Loading />;

    return (
        <>
            <header className="dashboard-header">
                <h1 className="dashboard-title">My Projects</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn" onClick={() => setIsModalOpen(true)}>
                        + New Project
                    </button>
                    {isAdmin && <button className="btn" onClick={() => navigate("/template")}>
                        Template
                    </button>}
                    <button
                        className="btn"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-main">
                <section className="projects-section">
                    {projects.length === 0 && (
                        <p className="empty-text">No projects yet. Create one!</p>
                    )}

                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div className="project-card" key={project._id}>
                                <img
                                    className="project-image"
                                    src={projectImage}
                                    alt="Project"
                                />
                                <div className="project-content">
                                    <h2 className="project-title">{project.name}</h2>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-actions">
                                        <a
                                            className="edit-btn"
                                            style={{ textDecoration: "none" }}
                                            href={`/editor/${project.slug}`}
                                        >
                                            Edit
                                        </a>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteProject(project._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }} title='Last Modified'>
                                            <IoIosTimer style={{color: "#666"}}/>
                                            <span style={{ fontSize: "12px", color: "#666" }}>{formatDateTime(project.updatedAt)}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }} title='Create Time'>
                                            <LuTimer style={{color: "#666"}} />
                                            <span style={{ fontSize: "12px", color: "#666" }}>{formatDateTime(project.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                modalFor={"project"}
            />
        </>
    );
};

export default Dashboard;