const TopBar = ({ editorRef }) => {

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

        const html = editor.getHtml();
        const css = editor.getCss();

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

        const html = editor.getHtml();
        const css = editor.getCss();

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
        </body>
        </html>`.trim();

        // open in new tab
        const newTab = window.open('', '_blank');
        newTab.document.write(fullHtml);
        newTab.document.close();
    }

    return (
        <div className="topbar">
            {/* Logo */}
            <span className="topbar-logo">My Editor</span>

            <div className="topbar-divider" />

            {/* Spacer pushes preview+export to the right */}
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
            <button className="topbar-btn export-btn" onClick={handleExport}>
                ⬇ Export HTML
            </button>


        </div>
    )
};

export default TopBar;