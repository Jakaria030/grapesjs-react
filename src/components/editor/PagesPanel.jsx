import { useEffect, useState } from 'react';

const PagesPanel = ({ editorRef, onEdit }) => {
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(null);

    const loadPages = () => {
        const editor = editorRef.current;
        if (!editor) return;
        const pm = editor.Pages;

        setActivePage(pm.getSelected()?.getId());
        setPages(pm.getAll().map(p => ({
            id: p.getId(),
            name: p.get('name') || 'Untitled',
            slug: p.get('slug') || '',
        })));
    };

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;
        loadPages();

        // refresh when page changes
        editor.on('page:add page:remove page:select', loadPages);
        return () => {
            editor.off('page:add page:remove page:select', loadPages);
        };
    }, [editorRef.current]);

    const handleSelect = (pageId) => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.Pages.select(pageId);
        setActivePage(pageId);
    };

    const handleDelete = (e, pageId) => {
        e.stopPropagation();
        const editor = editorRef.current;
        if (!editor) return;

        const pm = editor.Pages;
        if (pm.getAll()[0].get('type') === 'main') {
            alert('Cannot delete the Main page.');
            return;
        }

        const allPages = pm.getAll();
        const nextPage = allPages.find(p => p.getId() !== pageId);
        if (nextPage) {
            pm.select(nextPage.getId());
        }

        pm.remove(pageId);
        loadPages();
    };

    return (
        <div className="pages-list">
            {pages.map(page => (
                <div
                    key={page.id}
                    className={`page-item ${activePage === page.id ? 'active' : ''}`}
                    onClick={() => handleSelect(page.id)}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className="page-item-name">{page.name}</span>
                        {page.slug && (
                            <span style={{ color: '#aaa', fontSize: '11px' }}>/{page.slug}</span>
                        )}
                    </div>
                    <div className="page-item-actions">
                        <button
                            className="page-item-btn"
                            title="Edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(page);
                            }}
                        >✏️</button>
                        <button
                            className="page-item-btn"
                            title="Delete"
                            onClick={(e) => handleDelete(e, page.id)}
                        >🗑</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PagesPanel;
