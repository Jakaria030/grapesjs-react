import { useEffect, useState } from 'react';

const NewPageModal = ({ isOpen, onClose, onConfirm, editData }) => {
    const [pageName, setPageName] = useState('');
    const [slug, setSlug] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        if (editData) {
            setPageName(editData.name || '');
            setSlug(editData.slug || '');
        } else {
            setPageName('');
            setSlug('');
        }
    }, [isOpen, editData]);

    if (!isOpen) return null;

    const handleNameChange = (e) => {
        const val = e.target.value;
        setPageName(val);
        // auto generate slug from name
        setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    };

    const handleConfirm = () => {
        if (!pageName.trim()) return;
        onConfirm({ name: pageName.trim(), slug: slug.trim() });
        onClose();
    };
    
    return (
        <div className="npm-overlay">
            <div className="npm-modal">

                {/* Header */}
                <div className="npm-header">
                    <span className="npm-title">{editData ? '✏️ Edit Page' : '📄 New Page'}</span>
                    <button className="npm-close" onClick={onClose}>✕</button>
                </div>

                {/* Body */}
                <div className="npm-body">

                    <div className="npm-field">
                        <label className="npm-label">Page Name</label>
                        <input
                            className="npm-input"
                            type="text"
                            placeholder="e.g. About Us"
                            value={pageName}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="npm-field">
                        <label className="npm-label">Slug / Endpoint</label>
                        <div className="npm-slug-wrap">
                            <span className="npm-slug-prefix">/</span>
                            <input
                                className="npm-input npm-slug-input"
                                type="text"
                                placeholder="e.g. about-us"
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                            />
                        </div>
                        <span className="npm-hint">This will be the URL path for this page</span>
                    </div>

                </div>

                {/* Footer */}
                <div className="npm-footer">
                    <button className="npm-btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className="npm-btn-confirm"
                        onClick={handleConfirm}
                        disabled={!pageName.trim()}
                    >{editData ? 'Update Page' : 'Create Page'}</button>
                </div>

            </div>
        </div>
    );
};

export default NewPageModal;