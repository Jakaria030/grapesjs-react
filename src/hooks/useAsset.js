import { useEffect, useState } from "react";

const API = 'http://localhost:3000/api/files';

export const useAssets = (projectId) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFiles = async () => {
            if (!projectId) {
                setLoading(false);
                return;
            }

            const res = await fetch(`${API}/${projectId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const data = await res.json();

            setAssets(data);
            setLoading(false);
        };

        fetchFiles();
    }, []);

    const createAsset = async (data) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    const deleteAsset = async (assetId) => {
        await fetch(`${API}/${assetId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        setAssets((prev) => prev.filter((p) => p._id !== assetId));
    };

    return { assets, setAssets, loading, createAsset, deleteAsset };
};