import { Navigate, useNavigate } from 'react-router-dom';
import projectImage from '/assets/project-image.png';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import Loading from '../components/ui/Loading';
import { useProjects } from '../hooks/useProject';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Template = () => {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const { projects, loading, createProject, deleteProject } = useProjects("template");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        const newProject = await createProject(data);
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
                <h1 className="dashboard-title">My Templates</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn" onClick={() => setIsModalOpen(true)}>
                        + New Template
                    </button>
                    {isAdmin && <button className="btn" onClick={() => navigate("/dashboard")}>
                        Dashboard
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
                        <p className="empty-text">No Template yet. Create one!</p>
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
                modalFor={"template"}
            />
        </>
    );
};

export default Template;