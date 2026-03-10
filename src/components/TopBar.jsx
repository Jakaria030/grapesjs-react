import { useState } from "react";
import { getHtmlCssJs } from "../utils/utils";
import Modal from "./Modal";

const DEVICES = [
    { id: 'desktop', icon: '/assets/desktop-mac.png', label: 'Desktop' },
    { id: 'laptop', icon: '/assets/laptop.png', label: 'Laptop' },
    { id: 'tablet', icon: '/assets/tablet.png', label: 'Tablet' },
    { id: 'mobile', icon: '/assets/mobile-solid.png', label: 'Mobile' },
]

const TopBar = ({ editorRef, device, setDevice, }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({});

    const handleUndo = () => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.UndoManager.undo();
    };

    const handleRedo = () => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.UndoManager.redo();
    };

    const handleExport = () => {
        const editor = editorRef.current;
        if (!editor) return;

        const { html, css, js } = getHtmlCssJs(editor);

        const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>My Page</title>
            <style>
                ${css}
            </style>
        </head>
        <body>
            ${html}

            <script>
                ${js}
            </script>
        </body>
        </html>
            `.trim();

        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-page.html';
        a.click();

        URL.revokeObjectURL(url);
    };

    const handlePreview = () => {
        const editor = editorRef.current;
        if (!editor) return;

        const { html, css, js } = getHtmlCssJs(editor);

        const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Preview</title>
            <style>
                ${css}
            </style>
        </head>
        <body>
            ${html}

            <script>
                ${js}
            </script>
        </body>
        </html>`.trim();

        // open in new tab
        const newTab = window.open('', '_blank');
        newTab.document.write(fullHtml);
        newTab.document.close();
    };

    const showModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setContent({});
    };

    const handleCodePreview = () => {
        const editor = editorRef.current;
        if (!editor) return;

        // open modal
        // show in three seperate part
        const { html, css, js } = getHtmlCssJs(editor);
        setContent({ html, css, js });
        showModal();
    };

    return (
        <>
            <div className="topbar">
                {/* Logo */}
                <span className="topbar-logo">My Editor</span>

                <div className="topbar-divider" />

                {/* Spacer pushes preview+export to the right */}
                <div className="topbar-spacer" />

                {/* devices */}
                <div className="topbar-device-group">
                    {DEVICES.map((d) => {
                        return (
                            <button
                                key={d.id}
                                className={`device-btn ${device === d.id ? 'active' : ''}`}
                                title={d.label}
                                onClick={() => setDevice(d.id)}
                            >
                                <img src={`${d.icon}`} alt={`${d.label}`} />
                            </button>
                        )
                    })}
                </div>

                <div className="topbar-spacer" />

                <button className="topbar-btn preview-btn" onClick={handlePreview}>
                    👁 Preview
                </button>

                {/* Undo / Redo */}
                <button className="topbar-btn" onClick={handleUndo}>
                    ↩ Undo
                </button>
                <button className="topbar-btn" onClick={handleRedo}>
                    ↪ Redo
                </button>

                <div className="topbar-divider" />

                {/* Export */}
                <button className="topbar-btn code-preview-btn" onClick={handleCodePreview}>
                    Code Preview
                </button>
                <button className="topbar-btn export-btn" onClick={handleExport}>
                    ⬇ Export Code
                </button>

            </div>

            <Modal
                isOpen={open}
                onClose={closeModal}
                htmlCode={content.html}
                cssCode={content.css}
                jsCode={content.js}
            />

        </>
    )
};

export default TopBar;