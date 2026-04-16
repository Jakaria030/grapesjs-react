import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/api";

const useVersion = (id) => {
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVersions = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${BASE_URL}/versions/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                const data = await res.json();

                setVersions(data);
            } catch (_error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchVersions();
    }, [id]);

    const getVersionData = async (versionNo) => {
        const res = await fetch(`${BASE_URL}/versions/version/${id}?versionNo=${versionNo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();

        return data;
    };

    const saveVersionData = async (id, projectName, data) => {
        await fetch(`${BASE_URL}/projects/${id}/${projectName}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
    }

    return { versions, setVersions, getVersionData, saveVersionData, loading };
};

export default useVersion;