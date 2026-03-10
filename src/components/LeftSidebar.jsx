import { useEffect, useState } from "react";
import HeadingToolbar from "./HeadingTolbar";

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
        content: '<video controls style="max-width:100%;display:block"><source src="" type="video/mp4"/></video>',
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
        content: {
            type: 'heading',
            content: 'Heading',
            style: { padding: '8px', fontSize: '28px', fontWeight: '700' },
        },
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

const STYLE_PROPERTIES = [
    { label: 'Font Size', property: 'font-size', placeholder: '16px' },
    { label: 'Color', property: 'color', placeholder: '#000000' },
    { label: 'Background', property: 'background-color', placeholder: '#ffffff' },
    { label: 'Padding', property: 'padding', placeholder: '8px' },
    { label: 'Margin', property: 'margin', placeholder: '0px' },
    { label: 'Border', property: 'border', placeholder: '1px solid #ccc' },
    { label: 'Width', property: 'width', placeholder: 'auto' },
    { label: 'Height', property: 'height', placeholder: 'auto' },
];

const LeftSidebar = ({ editorRef }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('blocks');
    const [selectedEl, setSelectedEl] = useState(null);
    const [styles, setStyles] = useState({});
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [headingTag, setHeadingTag] = useState('h2');
    const [headingToolbarOpen, setHeadingToolbarOpen] = useState(false);

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

    useEffect(() => {
        const interval = setInterval(() => {
            const editor = editorRef.current;
            if (!editor) return;

            clearInterval(interval);

            // When an element is selected on canvas
            editor.on('component:selected', (component) => {
                setSelectedEl(component);

                // Read current styles of selected element
                const currentStyles = {};
                STYLE_PROPERTIES.forEach(({ property }) => {
                    currentStyles[property] = component.getStyle()[property] || '';
                });

                setStyles(currentStyles);
            });

            // When element is deselected
            editor.on('component:deselected', () => {
                setSelectedEl(null);
                setStyles({});
            });

        }, 300);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.on('component:selected', (component) => {
            const el = component.getEl();
            const tag = el?.tagName;

            if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tag)) {
                setSelectedHeading(component);
                setHeadingTag(tag.toLowerCase());
                setHeadingToolbarOpen(true);
            } else {
                setHeadingToolbarOpen(false);
            }
        });
    }, []);

    const handleHeadingChange = (newTag) => {
        if (!selectedHeading) return;

        selectedHeading.set('tagName', newTag);

        setHeadingTag(newTag);
    };

    // When user changes a style input
    const handleStyleChange = (property, value) => {
        // Update local state
        setStyles((prev) => ({ ...prev, [property]: value }));

        // Apply to the selected element on canvas
        if (selectedEl) {
            selectedEl.addStyle({ [property]: value });
        }
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
                            className={`tab-btn ${activeTab === 'styles' ? 'active' : ''}`}
                            onClick={() => setActiveTab('styles')}
                        >
                            Styles
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

                        {activeTab === 'styles' && (
                            <div className="sidebar-content">

                                <div className="sidebar-title">Style Properties</div>

                                {/* Show message if nothing selected */}
                                {!selectedEl && (
                                    <p className="tab-placeholder">Click an element on the canvas to style it</p>
                                )}

                                {/* Show style inputs when element is selected */}
                                {selectedEl && (
                                    <div className="style-properties">

                                        <div className="selected-tag">
                                            &lt;{selectedEl.get('tagName') || 'element'}&gt;
                                        </div>

                                        {STYLE_PROPERTIES.map(({ label, property, placeholder }) => (
                                            <div key={property} className="style-row">
                                                <label className="style-label">{label}</label>
                                                <input
                                                    className="style-input"
                                                    value={styles[property] || ''}
                                                    placeholder={placeholder}
                                                    onChange={(e) => handleStyleChange(property, e.target.value)}
                                                />
                                            </div>
                                        ))}

                                        {<HeadingToolbar
                                            isOpen={headingToolbarOpen}
                                            currentTag={headingTag}
                                            onChange={handleHeadingChange}
                                        />}

                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};

export default LeftSidebar;