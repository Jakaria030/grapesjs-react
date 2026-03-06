import { useState } from "react";

export const BLOCKS = [
    {
        id: 'text',
        label: 'Text',
        icon: '📝',
        content: '<p style="padding:8px;font-size:16px">Edit this text</p>',
    },
    {
        id: 'heading',
        label: 'Heading',
        icon: '🔤',
        content: '<h2 style="padding:8px;font-size:28px;font-weight:700">Heading</h2>',
    },
    {
        id: 'button',
        label: 'Button',
        icon: '🔲',
        content: '<a href="#" style="display:inline-block;padding:10px 24px;background:#e94560;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">Click Me</a>',
    },
    {
        id: 'image',
        label: 'Image',
        icon: '🖼️',
        content: '<img src="https://placehold.co/400x200" style="max-width:100%;display:block" />',
    },
    {
        id: 'divider',
        label: 'Divider',
        icon: '➖',
        content: '<hr style="border:none;border-top:2px solid #ddd;margin:16px 0" />',
    },
    {
        id: 'two-columns',
        label: '2 Columns',
        icon: '⬛⬛',
        content: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:8px"><div style="background:#f0f0f0;padding:20px;border-radius:4px">Column 1</div><div style="background:#f0f0f0;padding:20px;border-radius:4px">Column 2</div></div>',
    },
];

const LeftSidebar = ({ editorRef }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('blocks');

    // const handleAddBlock = (block) => {
    //     const editor = editorRef.current;
    //     if (!editor) return;

    //     editor.getWrapper().append(block.content);
    // }

    const handleDragStart = (e, block) => {
        const editor = editorRef.current;
        if (!editor) return;

        // Tell GrapesJS which block is being dragged
        editor.BlockManager.startDrag(
            editor.BlockManager.get(block.id)
        );
    };

    const handleDragEnd = () => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.BlockManager.endDrag();
    };


    return (
        <div className={`sidebar left-sidebar ${collapsed ? 'collapsed' : ''}`}>
            {/* Toggle button */}
            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? '→' : '←'}
            </button>

            {/* Sidebar content — hidden when collapsed */}
            {!collapsed && (
                <div className="sidebar-content">
                    {/* Tab buttons */}
                    <div className="tab-bar">
                        <button
                            className={`tab-btn ${activeTab === 'blocks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blocks')}
                        >
                            Blocks
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('layers')}
                        >
                            Layers
                        </button>
                    </div>

                    {/* Tab content */}
                    <div className="tab-content">
                        {activeTab === 'blocks' && (
                            <div className='blocks-grid'>
                                {BLOCKS.map((block) => (
                                    <div
                                        key={block.id}
                                        className="block-item"
                                        // onClick={() => handleAddBlock(block)}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, block)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <span className="block-icon">{block.icon}</span>
                                        <span className="block-label">{block.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'layers' && (
                            <div>
                                <p className="tab-placeholder">Layers comming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

export default LeftSidebar;