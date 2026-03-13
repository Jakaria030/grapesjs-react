import { useState, useEffect } from 'react';

const API = 'http://localhost:3001/projects';

export const useProject = (id) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setLoading(false);
                return;
            }
            
            const res = await fetch(`${API}/${id}`);
            const data = await res.json();

            setProject(data);
            setLoading(false);
        }

        fetchProject();
    }, [id]);

    const saveProject = async (gjsData) => {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...project, gjsData }),
        });
        return res.ok;
    };

    return { project, loading, saveProject };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch(API);
            const data = await res.json();

            setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const createProject = async (data) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    const deleteProject = async (projectId) => {
        await fetch(`${API}/${projectId}`, { method: 'DELETE' });
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
    };

    return { projects, loading, createProject, deleteProject };
};
