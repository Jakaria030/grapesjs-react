import { useState } from 'react';
import BlocksPanel from './BlocksPanel';
import StylePanel from './StylePanel';
import HeadingToolbar from './HeadingToolbar';
import { useEditorEvents } from '../../hooks/useEditorEvents';

const LeftSidebar = ({ editorRef }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('blocks');

    const {
        selectedEl,
        styles,
        headingTag,
        headingToolbarOpen,
        handleStyleChange,
        handleHeadingChange,
    } = useEditorEvents(editorRef);

    return (
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
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftSidebar;
