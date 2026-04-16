import { useState } from 'react';
import BlocksPanel from './BlocksPanel';
import StylePanel from './StylePanel';
import HeadingToolbar from './HeadingToolbar';
import PagesPanel from "./PagesPanel";
import { useEditorEvents } from '../../hooks/useEditorEvents';
import NewPageModal from './NewPageModal';
import ThemePanel from './ThemePanel';

const LeftSidebar = ({ editorRef, project }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('blocks');
    const [newPageModal, setNewPageModal] = useState(false);
    const [pages, setPages] = useState({});
    const [editPage, setEditPage] = useState(null);

    const {
        selectedEl,
        styles,
        headingTag,
        headingToolbarOpen,
        handleStyleChange,
        handleHeadingChange,
    } = useEditorEvents(editorRef);

    return (
        <>
            <div className={`sidebar left-sidebar ${collapsed ? 'collapsed' : ''}`}>
                <button
                    className="sidebar-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? '→' : '←'}
                </button>

                {!collapsed && (
                    <div className="sidebar-content">
                        <div className="tab-bar">
                            <button
                                className={`tab-btn ${activeTab === 'blocks' ? 'active' : ''}`}
                                onClick={() => setActiveTab('blocks')}
                            >
                                Blocks
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'styles' ? 'active' : ''}`}
                                onClick={() => setActiveTab('styles')}
                            >
                                Styles
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'pages' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pages')}
                            >
                                Pages
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
                                onClick={() => setActiveTab('theme')}
                            >
                                Theme
                            </button>

                        </div>

                        <div className="tab-content">
                            {activeTab === 'blocks' && (
                                <BlocksPanel editorRef={editorRef} />
                            )}

                            {activeTab === 'styles' && (
                                <div className="sidebar-content">
                                    <div className="sidebar-title">Style Properties</div>

                                    {!selectedEl && (
                                        <p className="tab-placeholder">
                                            Click an element on the canvas to style it
                                        </p>
                                    )}

                                    {selectedEl && (
                                        <div className="style-properties">
                                            <HeadingToolbar
                                                isOpen={headingToolbarOpen}
                                                currentTag={headingTag}
                                                onChange={handleHeadingChange}
                                            />
                                            <StylePanel
                                                selectedEl={selectedEl}
                                                styles={styles}
                                                onChange={handleStyleChange}
                                                editorRef={editorRef}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'pages' && (
                                <>
                                    <div className="pages-header">
                                        <span className="pages-title">All Pages</span>
                                        <button className="pages-new-btn" onClick={() => setNewPageModal(true)}>+ New Page</button>
                                    </div>
                                    <PagesPanel editorRef={editorRef} onEdit={(page) => setEditPage(page)} />
                                </>
                            )}

                            {activeTab === 'theme' && (
                                <>
                                    <div className="theme-header">
                                        <span className="theme-title">Theme Settings</span>
                                    </div>
                                    <ThemePanel editorRef={editorRef} project={project} onThemeChange={(theme) => {
                                        editorRef.current._themeSettings = theme;
                                    }} />
                                </>
                            )}
                        </div>
                    </div>)
                }
            </div >
            <NewPageModal
                isOpen={newPageModal || !!editPage}
                onClose={() => {
                    setNewPageModal(false);
                    setEditPage(null);
                }}
                editData={editPage}
                onConfirm={({ name, slug }) => {
                    const editor = editorRef.current;
                    if (!editor) return;
                    const pm = editor.Pages;

                    if (editPage) {
                        // update existing page
                        const page = pm.get(editPage.id);
                        if (page) {
                            page.set('name', name);
                            page.set('slug', slug);
                            editor.trigger('page:add');
                        }
                    } else {
                        // create new page
                        const newPage = pm.add({ name, slug });
                        pm.select(newPage.getId());

                        const editor = editorRef.current;
                        setTimeout(() => {
                            const pm = editor.Pages;
                            const allPages = pm.getAll();

                            const homePage = allPages.find(p =>
                                p.get('slug') === 'index' ||
                                p.get('slug') === '' ||
                                p.get('slug') === 'home' ||
                                p.get('type') === 'main'
                            );

                            if (!homePage) return;

                            // get raw JSON data safely
                            const projectData = editor.getProjectData();
                            const homePageData = projectData.pages.find(p => p.id === homePage.getId());
                            const homeComponentsJSON = homePageData?.frames?.[0]?.component?.components || [];


                            // find header and footer in raw JSON
                            const headerJSON = homeComponentsJSON.find(c =>
                                c.tagName === 'header' ||
                                c.classes?.includes('hdr')
                            );
                            const footerJSON = homeComponentsJSON.find(c =>
                                c.tagName === 'footer' ||
                                c.classes?.includes('ftr')
                            );

                            const newWrapper = editor.DomComponents.getWrapper();
                            newWrapper.components().reset([]);

                            const toAdd = [];
                            if (headerJSON) toAdd.push(headerJSON);
                            if (headerJSON || footerJSON) toAdd.push({ tagName: 'div', style: { padding: '16px', 'min-height': '500px' } });
                            if (footerJSON) toAdd.push(footerJSON);

                            newWrapper.components().add(toAdd);
                        }, 200);

                    }

                    setNewPageModal(false);
                    setEditPage(null);
                }}
            />
        </>
    );
};

export default LeftSidebar;
