import { useNavigate } from 'react-router-dom';
import projectImage from '/assets/project-image.png';
import CreateProjectModal from '../components/dashboard/CreateProjectModal';
import Loading from '../components/ui/Loading';
import { useProjects } from '../hooks/useProject';
import { useState } from 'react';

const Dashboard = () => {
    const { projects, loading, createProject, deleteProject } = useProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        const newProject = await createProject(data);
        setIsModalOpen(false);
        navigate(`/editor/${newProject.id}`);
    };

    if (loading) return <Loading />;

    return (
        <>
            <header className="dashboard-header">
                <h1 className="dashboard-title">My Projects</h1>
                <button className="new-project-btn" onClick={() => setIsModalOpen(true)}>
                    + New Project
                </button>
            </header>

            <main className="dashboard-main">
                <section className="projects-section">
                    {projects.length === 0 && (
                        <p className="empty-text">No projects yet. Create one!</p>
                    )}

                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div className="project-card" key={project.id}>
                                <img
                                    className="project-image"
                                    src={projectImage}
                                    alt="Project"
                                />
                                <div className="project-content">
                                    <h2 className="project-title">{project.name}</h2>
                                    <p className="project-description">{project.description}</p>
                                    <div className="project-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/editor/${project.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteProject(project.id)}
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
            />
        </>
    );
};

export default Dashboard;