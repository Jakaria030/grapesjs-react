import { useEffect, useState } from "react";

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

const RightSidebar = ({ editorRef }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedEl, setSelectedEl] = useState(null);
    const [styles, setStyles] = useState({});

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
        <div className={`sidebar right-sidebar ${collapsed ? 'collapsed' : ''}`}>

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

                        </div>
                    )}

                </div>
            )}
        </div>
    )
};

export default RightSidebar;