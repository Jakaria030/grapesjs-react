import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeModal from './CodeModal';
import { getHtmlCssJs } from '../../utils/getHtmlCssJs';
import { buildFullHtml } from '../../utils/buildFullHtml';

const DEVICES = [
    { id: 'desktop', icon: '/assets/desktop-mac.png', label: 'Desktop' },
    { id: 'laptop', icon: '/assets/laptop.png', label: 'Laptop' },
    { id: 'tablet', icon: '/assets/tablet.png', label: 'Tablet' },
    { id: 'mobile', icon: '/assets/mobile-solid.png', label: 'Mobile' },
];

const DEVICE_MAP = {
    desktop: 'Desktop',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile',
};

const TopBar = ({ editorRef, device, setDevice, onSave }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

    const getEditor = () => editorRef.current;

    const handleUndo = () => getEditor()?.UndoManager.undo();
    const handleRedo = () => getEditor()?.UndoManager.redo();

    const handleReset = () => {
        const editor = getEditor();
        if (!editor) return;
        editor.DomComponents.clear();
        editor.UndoManager.clear();
    };

    const handleExport = () => {
        const editor = getEditor();
        if (!editor) return;

        const fullHtml = buildFullHtml({ ...getHtmlCssJs(editor), title: 'My Page' });
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-page.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePreview = () => {
        const editor = getEditor();
        if (!editor) return;

        const fullHtml = buildFullHtml({ ...getHtmlCssJs(editor), title: 'Preview' });
        const newTab = window.open('', '_blank');
        newTab.document.write(fullHtml);
        newTab.document.close();
    };

    const handleCodePreview = () => {
        const editor = getEditor();
        if (!editor) return;

        const { html: html_body, css, js } = getHtmlCssJs(editor);
        const html = buildFullHtml({ html: html_body, css, js: '', title: 'Preview' });
        setModalContent({ html, css, js });
        setModalOpen(true);
    };

    useEffect(() => {
        const editor = getEditor();
        if (!editor) return;
        editor.DeviceManager.select(DEVICE_MAP[device]);
    }, [device]);

    return (
        <>
            <div className="topbar">
                <span className="topbar-logo">My Editor</span>
                <div className="topbar-divider" />

                <button className="topbar-btn" onClick={() => navigate('/')}>↩ Back</button>
                <button className="topbar-btn" onClick={onSave}>💾 Save</button>

                <div className="topbar-divider" />
                <div className="topbar-spacer" />

                <div className="topbar-device-group">
                    {DEVICES.map((d) => (
                        <button
                            key={d.id}
                            className={`device-btn ${device === d.id ? 'active' : ''}`}
                            title={d.label}
                            onClick={() => setDevice(d.id)}
                        >
                            <img src={d.icon} alt={d.label} draggable="false" />
                        </button>
                    ))}
                </div>

                <div className="topbar-spacer" />

                <button className="topbar-btn preview-btn" onClick={handlePreview}>👁 Preview</button>
                <button className="topbar-btn" onClick={handleUndo}>↩ Undo</button>
                <button className="topbar-btn" onClick={handleRedo}>↪ Redo</button>
                <button className="topbar-btn" onClick={handleReset}>↺ Reset</button>

                <div className="topbar-divider" />

                <button className="topbar-btn code-preview-btn" onClick={handleCodePreview}>Code Preview</button>
                <button className="topbar-btn export-btn" onClick={handleExport}>⬇ Export Code</button>
            </div>

            <CodeModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setModalContent({}); }}
                htmlCode={modalContent.html}
                cssCode={modalContent.css}
                jsCode={modalContent.js}
            />
        </>
    );
};

export default TopBar;
