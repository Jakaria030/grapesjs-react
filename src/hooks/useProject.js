import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api/projects';
const BASE_URL = 'http://localhost:3000/api';
export const useProject = (id) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);

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

            // TODO: using data._id and data.currentVersion complete next Undo/Redo task
            const historiesData = await getHistories(data._id, data.currentVersion);

            setUndoStack(historiesData);
            setProject(historiesData.length === 0 ? data : historiesData[historiesData.length - 1].historyData);
            setLoading(false);
        }

        fetchProject();
    }, [id]);

    const getHistories = async (id, versionNo) => {
        const historiesRes = await fetch(`${BASE_URL}/history?projectId=${id}&versionNo=${versionNo}`);
        return await historiesRes.json();
    };

    const saveProject = async (gjsData) => {
        const response = await fetch(`${BASE_URL}/versions/${project._id}`);
        const versions = await response.json();

        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ ...project, gjsData, currentVersion: versions.length + 1 }),
        });
        const updatedProject = await res.json();

        await fetch(`${BASE_URL}/versions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: updatedProject._id,
            }),
        });

        return res.ok;
    };

    const saveHistory = async (projectData) => {
        try {
            const res = await fetch(`${BASE_URL}/history`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ projectId: project._id, historyData: projectData }),
            });

            const data = await res.json();

            setUndoStack([...undoStack, data]);
            setProject(data.historyData);

            if (undoStack.length >= 20) {
                const history = undoStack.shift();
                await deleteHistory(history._id);
            }
        } catch (error) {
            console.log("Something went wrong")
        }
    };

    const deleteHistory = async (id) => {
        try {
            await fetch(`${BASE_URL}/history/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
        } catch (error) {
            console.log("Something went wrong")
        }
    }

    const handleUndo = async () => {
        if (undoStack.length <= 1) {
            return alert("You can't undo anymore. Go back to the previous version.");
        }

        const history = undoStack.pop();
        setRedoStack([...redoStack, history]);
        setProject(undoStack[undoStack.length - 1].historyData);
        await deleteHistory(history._id);
    };

    const handleRedo = async () => {
        if (redoStack.length === 0) {
            return alert("You can't redo anymore.");
        }

        const history = redoStack.pop();
        setUndoStack([...undoStack, history]);
        setProject(history.historyData);
        await saveHistory(history.historyData);
    };

    return { project, setProject, loading, saveProject, saveHistory, handleUndo, handleRedo, getHistories };
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
