import { useState } from "react";

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit({ name, description });
        setName("");
        setDescription("");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Create New Project</h2>

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

                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectModal;