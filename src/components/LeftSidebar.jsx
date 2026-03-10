import { useState } from "react";

// blocks.js
export const BLOCKS = [
    {
        id: 'text',
        label: 'Text',
        media: `<img src='/assets/format-text.png' draggable='false'/>`,
        content: '<p style="padding:8px;font-size:16px">Edit this text</p>',
    },
    {
        id: 'link',
        label: 'Link',
        media: `<img src='/assets/link-alt.png' draggable='false'/>`,
        content: '<a href="#" style="color:#5b6cff;text-decoration:underline">Click here</a>',
    },
    {
        id: 'image',
        label: 'Image',
        media: `<img src='/assets/image-block.png' draggable='false'/>`,
        content: '<img src="https://placehold.co/400x200" style="max-width:100%;display:block" />',
    },
    {
        id: 'video',
        label: 'Video',
        media: `<img src='/assets/handle-right.png' draggable='false'/>`,
        content: '<video controls style="max-width:100%"><source src="" /></video>',
    },
    {
        id: 'map',
        label: 'Map',
        media: `<img src='/assets/map-check-outline.png' draggable='false'/>`,
        content: '<iframe src="https://maps.google.com/maps?q=new+york&output=embed" style="width:100%;height:300px;border:none"></iframe>',
    },
    {
        id: 'button',
        label: 'Button',
        media: `<img src='/assets/gesture-tap-button.png' draggable='false'/>`,
        content: '<a href="#" style="display:inline-block;padding:10px 24px;background:#5b6cff;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">Click Me</a>',
    },
    {
        id: 'heading',
        label: 'Heading',
        media: `<img src='/assets/bx-heading.png' draggable='false'/>`,
        content: '<h2 style="padding:8px;font-size:28px;font-weight:700">Heading</h2>',
    },
    {
        id: 'one-column',
        label: '1 Column',
        media: `<img src='/assets/rectangle.png' draggable='false'/>`,
        content: '<div style="padding:20px;background:#f0f0f0;border-radius:4px;min-height:80px">Column</div>',
    },
    {
        id: 'two-columns',
        label: '2 Columns',
        media: `<img src='/assets/columns-solid.png' draggable='false'/>`,
        content: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:8px"><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 1</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 2</div></div>',
    },
    {
        id: 'three-columns',
        label: '3 Columns',
        media: `<img src='/assets/layout-three-columns.png' draggable='false'/>`,
        content: '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:8px"><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 1</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 2</div><div style="background:#f0f0f0;padding:20px;border-radius:4px;min-height:80px">Column 3</div></div>',
    },
    {
        id: 'container',
        label: 'Container',
        media: `<img src='/assets/select-all.png' draggable='false'/>`,
        content: '<div style="max-width:1200px;margin:0 auto;padding:0 16px;min-height:100px"></div>',
    },
    {
        id: 'div',
        label: 'Div',
        media: `<img src='/assets/file-code.png' draggable='false'/>`,
        content: '<div style="padding:16px;min-height:60px"></div>',
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
                            <div className="blocks-grid">
                                {BLOCKS.map((block) => (
                                    <div
                                        key={block.id}
                                        className="block-item"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, block)}
                                        onDragEnd={handleDragEnd}
                                    >
                                        {/* Font Awesome icon via dangerouslySetInnerHTML */}
                                        <span
                                            className="block-icon"
                                            dangerouslySetInnerHTML={{ __html: block.media }}
                                        />
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