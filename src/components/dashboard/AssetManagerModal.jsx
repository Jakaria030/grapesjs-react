import { useEffect, useRef, useState } from "react";
import { useAssets } from "../../hooks/useAsset";

const BASE_URL = "http://localhost:3000";

const AssetManagerModal = ({ isOpen, onClose, assetProps, projectId }) => {
    const { assets, setAssets, loading, createAsset, deleteAsset } = useAssets(projectId);
    const [dragOver, setDragOver] = useState(false);
    const [status, setStatus] = useState(null);
    const fileInputRef = useRef(null);

    const handleUpload = async (file) => {
        if (!file) return;

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            setStatus({ type: "error", message: "Only image or video files are allowed!" });
            return;
        }

        setStatus({ type: "uploading", message: `Uploading ${file.name}...` });

        const formData = new FormData();
        const endpoint = isImage ? "image" : "video";
        formData.append(endpoint, file);

        try {
            const res = await fetch(`${BASE_URL}/api/media/${endpoint}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.url) {
                const asset_data = {
                    projectId: projectId,
                    name: file.name || data.url.split("/").pop(),
                    url: data.url,
                };

                const res = await createAsset(asset_data);

                if (res.id) {
                    setAssets((prev) => [...prev, res]);
                    setStatus({ type: "success", message: "Uploaded successfully!" });
                }

            }
        } catch (err) {
            setStatus({ type: "error", message: "Upload failed. Please try again." });
        }
    };

    const handleFileChange = (e) => handleUpload(e.target.files[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleUpload(e.dataTransfer.files[0]);
    };

    const handleDelete = async (e, asset) => {
        e.stopPropagation();

        try {
            const res = await fetch(`${BASE_URL}/api/media`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: asset.url }),
            });
            const data = await res.json();

            if (data.ok) {
                await deleteAsset(asset.id);

                setAssets(assets.filter((a) => a.id !== asset.id));
                setStatus({ type: "success", message: "Asset deleted!." });
            }

        } catch (err) {
            console.error("Delete failed:", err);
            setStatus({ type: "error", message: "Asset not deleted!." });
        }
    };

    const handleSelect = (asset) => {
        const fullUrl = `${BASE_URL}/${asset.url}`;
        if(assetProps?.select){
            assetProps.select({src: fullUrl}, true);
        }

        onClose?.();
    };

    if (status) {
        setTimeout(() => {
            setStatus(null);
        }, 2000);
    }


    if (!isOpen) return null;

    return (
        <div className="am-overlay">
            <div className="am-modal">

                {/* Header */}
                <div className="am-header">
                    <span className="am-title">Asset Manager</span>
                    <button className="am-close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Body */}
                <div className="am-body">

                    {/* Left: asset grid */}
                    <div className="am-left">
                        {loading ? (
                            <p className="am-empty">Loading assets...</p>
                        ) : assets.length === 0 ? (
                            <p className="am-empty">No assets uploaded yet.</p>
                        ) : (
                            <div className="am-grid">
                                {assets.map((asset, indx) => {
                                    const fullUrl = `${BASE_URL}/${asset.url}`;
                                    const isVideo = asset.url.includes("videos");

                                    return (
                                        <div key={indx} className="am-card" onClick={() => handleSelect(asset)}>
                                            {isVideo ? (
                                                <video src={fullUrl} className="am-thumb" muted />
                                            ) : (
                                                <img src={fullUrl} className="am-thumb" alt={asset.name} />
                                            )}

                                            <div className="am-card-foot">
                                                <span className="am-fname">
                                                    {asset.name}
                                                </span>
                                                <button className="am-del" onClick={(e) => handleDelete(e, asset)}>
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })

                                }
                            </div>
                        )}
                    </div>

                    {/* Right: upload */}
                    <div className="am-right">
                        <p className="am-up-title">Upload file</p>
                        <p className="am-up-sub">Images &amp; videos only</p>

                        <div
                            className={`am-dropzone ${dragOver ? "drag" : ""}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="am-drop-icon">↑</div>
                            <p className="am-drop-text">Drop or <span>browse</span></p>
                            <p className="am-drop-hint">JPG, JPEG, PNG, MP4</p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {status && (
                            <div className={`am-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <p className="am-divider-label">Accepted types</p>
                        <div className="am-tags">
                            <span className="am-tag info">image/*</span>
                            <span className="am-tag success">video/*</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AssetManagerModal;