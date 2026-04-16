import { useState } from 'react';

const API = 'http://localhost:3000/api';

export const useAI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateContent = async ({ name, description, templateId }) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API}/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, templateId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'AI generation failed');
            return data.gjsData;

        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { generateContent, loading, error };
};