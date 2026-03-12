import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectImage from "/assets/project-image.png";
import CreateProjectModal from "../components/CreateProjectModal";
import Loading from "../components/Loading";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Load projects
    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch("http://localhost:3001/projects");
            const data = await res.json();

            setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);


    // handle modal and project creation
    const handleCreateNewProject = () => {
        setIsModalOpen(true);
    };

    // project create and save here
    const handleSubmit = async (data) => {
        const res = await fetch('http://localhost:3001/projects', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const newProject = await res.json();
        setIsModalOpen(false);
        navigate(`/editor/${newProject.id}`);
    };

    // navigate the project
    const handleNavigateProject = (projectId) => {
        navigate(`/editor/${projectId}`);
    };

    // handle delete projects
    const handleDeleteProject = async (projectId) => {
        await fetch(`http://localhost:3001/projects/${projectId}`, {
            method: "DELETE"
        });

        setProjects(projects.filter(project => project.id !== projectId));
    };


    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <>
            <header className="dashboard-header">
                <h1 className="dashboard-title">My Projects</h1>
                <button className="new-project-btn" onClick={handleCreateNewProject}>
                    + New Project
                </button>
            </header>

            <main className="dashboard-main">
                <section className="projects-section">

                    {projects.length === 0 && (
                        <p className="empty-text">No projects yet. Create one!</p>
                    )}

                    <div className="projects-grid">
                        {projects.map((project) => {
                            return (
                                <div className="project-card" key={project.id}>

                                    <img
                                        className="project-image"
                                        src={projectImage}
                                        alt="Project"
                                    />

                                    <div className="project-content">
                                        <h2 className="project-title">{project.name}</h2>

                                        <p className="project-description">
                                            {project.description}
                                        </p>

                                        <div className="project-actions">
                                            <button onClick={() => handleNavigateProject(project.id)} className="edit-btn">Edit</button>
                                            <button onClick={() => handleDeleteProject(project.id)} className="delete-btn">Delete</button>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </section>
            </main>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default Dashboard;