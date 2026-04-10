import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api/projects';

export const useProject = (id) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            const res = await fetch(`${API}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();

            setProject(data);
            setLoading(false);
        }

        fetchProject();
    }, [id]);

    const saveProject = async (gjsData) => {
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ ...project, gjsData }),
        });
        return res.ok;
    };

    return { project, loading, saveProject };
};

export const useProjects = (projectType = "project") => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch(`${API}?projectType=${projectType}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await res.json();

            setProjects(data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const createProject = async (data) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    const deleteProject = async (projectId) => {
        await fetch(`${API}/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
    };

    return { projects, loading, createProject, deleteProject };
};

export const useTemplate = (projectType = "template") => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            const res = await fetch(`${API}/template?projectType=${projectType}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await res.json();

            setTemplates(data);
            setLoading(false);
        };

        fetchTemplates();
    }, []);


    return { templates, loading };
};
