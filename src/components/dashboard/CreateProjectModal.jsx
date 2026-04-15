import { useState } from 'react';
import { useTemplate } from '../../hooks/useProject';
import templateImage from "/assets/template.jpg";
import { useAI } from '../../hooks/useAI';
import Loading from '../ui/Loading';

const CreateProjectModal = ({ isOpen, onClose, onSubmit, modalFor = "project" }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [templateId, setTemplateId] = useState(null);
    const { templates: allTemplates, loading: loadingTemplate } = useTemplate("template");
    const { generateContent, loading: loadingGenerate, error } = useAI()

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            const aiGjsData = await generateContent({ name, description, templateId }) || {};

            onSubmit({ name, description, gjsData: aiGjsData, projectType: modalFor });
            setName('');
            setDescription('');
        } catch (error) {
            alert("AI generation failed");
        }
    };


    const templates = [...allTemplates.filter((template) => template.name === "Blank Template"), ...allTemplates.filter((template) => template.name !== "Blank Template")];

    if (loadingGenerate) return <Loading />

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{modalFor === "project" ? "Create New Project" : "Create New Template"}</h2>

                <input
                    className="modal-input"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="modal-textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <h3 className="modal-title" style={{ fontSize: "14px" }}>Choose a Template</h3>

                <div style={{ margin: "10px 0", height: "1px", background: "#ddd" }} />

                {loadingTemplate ? <p style={{ marginTop: "8px", fontSize: "14px" }}>Template loading...</p> : templates && templates.length > 0 ? (
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        {templates.map((template) => (
                            <label
                                key={template._id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    width: "150px",
                                    cursor: "pointer",
                                    textAlign: "center",
                                }}
                            >
                                {/* Radio button */}
                                <input
                                    type="radio"
                                    name="template"
                                    value={template._id}
                                    onChange={() => setTemplateId(template._id)}
                                />

                                {/* Static image */}
                                <div>
                                    <img
                                        src={templateImage}
                                        alt="Template"
                                        style={{ width: "100%", height: "80px", objectFit: "cover" }}
                                    />
                                </div>

                                {/* Project name */}
                                <p style={{ marginTop: "8px", fontSize: "14px" }}>
                                    {template.name}
                                </p>
                            </label>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: "center", fontSize: "14px", color: "#111" }}>
                        No Template Available
                    </p>
                )}


                <div style={{ margin: "10px 0", height: "1px", background: "#ddd" }} />

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>



            </div>
        </div>
    );
};

export default CreateProjectModal;
