import { useEffect, useState } from "react";

const API = 'http://localhost:3001/files';

export const useAssets = (projectId) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFiles = async () => {
            if (!projectId) {
                setLoading(false);
                return;
            }

            const res = await fetch(API);
            const data = await res.json();

            const currentProjectImages = data.filter((d) => d.projectId === projectId);

            setAssets(currentProjectImages);
            setLoading(false);
        };

        fetchFiles();
    }, []);

    const createAsset = async (data) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    const deleteAsset = async (assetId) => {
        await fetch(`${API}/${assetId}`, { method: 'DELETE' });
        setAssets((prev) => prev.filter((p) => p.id !== assetId));
    };

    return { assets, setAssets, loading, createAsset, deleteAsset };
};