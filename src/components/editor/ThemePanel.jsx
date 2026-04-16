import { useEffect, useState } from 'react';

const GOOGLE_FONTS = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat',
    'Poppins', 'Raleway', 'Playfair Display',
    'Nunito', 'Ubuntu', 'Mulish', 'Josefin Sans', 'DM Sans',
];

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const DEFAULT_HEADING_SIZES = {
    h1: { fontSize: '48', fontWeight: '700', lineHeight: '1.2', color: '#ffffff' },
    h2: { fontSize: '36', fontWeight: '700', lineHeight: '1.3', color: '#ffffff' },
    h3: { fontSize: '28', fontWeight: '600', lineHeight: '1.4', color: '#ffffff' },
    h4: { fontSize: '22', fontWeight: '600', lineHeight: '1.4', color: '#ffffff' },
    h5: { fontSize: '18', fontWeight: '500', lineHeight: '1.5', color: '#ffffff' },
    h6: { fontSize: '16', fontWeight: '500', lineHeight: '1.5', color: '#ffffff' },
};

const Section = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid #ddd' }}>
            <div
                onClick={() => setOpen(!open)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', cursor: 'pointer' }}
            >
                <span style={{ color: '#0f3460', fontSize: '13px', fontWeight: 600 }}>{title}</span>
                <span style={{ color: '#0f3460', fontSize: '12px' }}>{open ? '▾' : '▸'}</span>
            </div>
            {open && (
                <div style={{ paddingBottom: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

const Row = ({ label, children }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <label style={{ color: '#0f3460', fontSize: '12px', flexShrink: 0, width: '80px', fontWeight: 500 }}>{label}</label>
        {children}
    </div>
);

const HeadingRow = ({ tag, values, onChange }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
            <div
                onClick={() => setOpen(!open)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', cursor: 'pointer', background: '#f5f5f5' }}
            >
                <span style={{ color: '#0f3460', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' }}>{tag}</span>
                <span style={{ color: '#0f3460', fontSize: '12px' }}>{open ? '▾' : '▸'}</span>
            </div>
            {open && (
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', background: '#ffffff' }}>
                    <Row label="Font Size">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <input
                                type="number"
                                value={values.fontSize}
                                onChange={e => onChange(tag, 'fontSize', e.target.value)}
                                style={{ width: '60px', padding: '4px 6px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', color: '#0f3460', fontSize: '12px' }}
                            />
                            <span style={{ color: '#0f3460', fontSize: '11px' }}>px</span>
                        </div>
                    </Row>
                    <Row label="Font Weight">
                        <select
                            value={values.fontWeight}
                            onChange={e => onChange(tag, 'fontWeight', e.target.value)}
                            style={{ flex: 1, padding: '4px 6px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', color: '#0f3460', fontSize: '12px' }}
                        >
                            {['300', '400', '500', '600', '700', '800'].map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </Row>
                    <Row label="Line Height">
                        <input
                            type="number"
                            step="0.1"
                            value={values.lineHeight}
                            onChange={e => onChange(tag, 'lineHeight', e.target.value)}
                            style={{ width: '60px', padding: '4px 6px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', color: '#0f3460', fontSize: '12px' }}
                        />
                    </Row>
                    <Row label="Color">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input
                                type="color"
                                value={values.color}
                                onChange={e => onChange(tag, 'color', e.target.value)}
                                style={{ width: '32px', height: '28px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={values.color}
                                onChange={e => onChange(tag, 'color', e.target.value)}
                                style={{ flex: 1, padding: '4px 6px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', color: '#0f3460', fontSize: '12px' }}
                            />
                        </div>
                    </Row>
                </div>
            )}
        </div>
    );
};

const ThemePanel = ({ editorRef, project, onThemeChange }) => {
    const [colors, setColors] = useState({
        primary: '#e94560',
        secondary: '#0f3460',
        background: '#ffffff',
        text: '#0f3460',
        accent: '#f5f5f5',
    });
    const [fontFamily, setFontFamily] = useState('Inter');
    const [headings, setHeadings] = useState(DEFAULT_HEADING_SIZES);

    // sync from project data every time panel mounts or project changes
    useEffect(() => {
        const savedTheme = project?.gjsData?.theme ||
            editorRef.current?._themeSettings;

        if (!savedTheme) return;
        if (savedTheme.fontFamily) setFontFamily(savedTheme.fontFamily);
        if (savedTheme.headings) setHeadings(savedTheme.headings);
        if (savedTheme.colors) setColors(savedTheme.colors);
    }, [project]);

    const handleColorChange = (key, value) => {
        setColors(prev => ({ ...prev, [key]: value }));
    };

    const handleHeadingChange = (tag, prop, value) => {
        setHeadings(prev => ({
            ...prev,
            [tag]: { ...prev[tag], [prop]: value }
        }));
    };

    const handleApply = () => {
        const editor = editorRef.current;
        if (!editor) return;

        const theme = { fontFamily, headings, colors };
        editor._themeSettings = theme;
        onThemeChange?.(theme);

        const pm = editor.Pages;
        const allPages = pm.getAll();
        const currentPageId = pm.getSelected()?.getId();

        allPages.forEach(page => {
            pm.select(page.getId());
            const cc = editor.CssComposer;

            const toRemove = [];
            cc.getAll().each(rule => {
                const sel = rule.getSelectors()?.toString();
                if (sel === ':root' || sel === 'body' || sel === 'a' || sel === 'p' || sel === 'button' || sel === 'input' || sel === 'textarea' || sel === 'select' || HEADINGS.includes(sel)) {
                    toRemove.push(rule);
                }
            });
            toRemove.forEach(r => cc.remove(r));


            cc.setRule(':root', {
                '--primary': colors.primary,
                '--secondary': colors.secondary,
                '--background': colors.background,
                '--text': colors.text,
                '--accent': colors.accent,
                '--link-color': colors.primary,
                '--btn-radius': '6px',
                '--btn-padding': '10px 24px',
                '--border-color': '#dddddd',
                '--font-family': `'${fontFamily}', sans-serif`,
                '--font-size-base': '16px',
                '--line-height-base': '1.6',
            });

            cc.setRule('body', {
                'font-family': 'var(--font-family)',
                'color': 'var(--text)',
                'background-color': 'var(--background)',
            });

            HEADINGS.forEach(tag => {
                cc.setRule(tag, {
                    'font-size': `${headings[tag].fontSize}px`,
                    'font-weight': headings[tag].fontWeight,
                    'line-height': headings[tag].lineHeight,
                    'color': headings[tag].color,
                    'font-family': 'var(--font-family)',
                });
            });

            cc.setRule('button', {
                'background-color': 'var(--primary)',
                'color': 'var(--text)',
                'border-radius': 'var(--btn-radius)',
                'padding': 'var(--btn-padding)',
                'font-family': 'var(--font-family)',
                'border': 'none',
                'cursor': 'pointer',
                'font-weight': '600',
            });

            cc.setRule('a', {
                'color': 'var(--link-color)',
                'text-decoration': 'none',
            });

            cc.setRule('p', {
                'font-family': 'var(--font-family)',
                'color': 'var(--text)',
                'font-size': 'var(--font-size-base)',
                'line-height': 'var(--line-height-base)',
            });

            cc.setRule('input', {
                'font-family': 'var(--font-family)',
                'border': '1px solid var(--border-color)',
                'border-radius': 'var(--btn-radius)',
                'padding': '8px 12px',
                'color': 'var(--text)',
                'background': 'var(--background)',
            });

            cc.setRule('textarea', {
                'font-family': 'var(--font-family)',
                'border': '1px solid var(--border-color)',
                'border-radius': 'var(--btn-radius)',
                'padding': '8px 12px',
                'color': 'var(--text)',
                'background': 'var(--background)',
            });

            cc.setRule('select', {
                'font-family': 'var(--font-family)',
                'border': '1px solid var(--border-color)',
                'border-radius': 'var(--btn-radius)',
                'padding': '8px 12px',
                'color': 'var(--text)',
                'background': 'var(--background)',
            });
        });

        pm.select(currentPageId);

        const iframe = editor.Canvas.getFrameEl();
        const doc = iframe?.contentDocument;
        if (doc) {
            const existing = doc.getElementById('theme-font');
            if (existing) existing.remove();
            const link = doc.createElement('link');
            link.id = 'theme-font';
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
            doc.head.appendChild(link);
        }

        alert('Theme applied to all pages');

    };

    return (

        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff', minHeight: '100%', overflowY: 'auto', maxHeight: 'calc(100vh - 250px)', scrollbarWidth: 'thin', scrollbarColor: '#0f3460 transparent' }}>
            {/* Typography Section */}
            <Section title="Typography">
                {/* Font Family */}
                <Row label="Font Family">
                    <select
                        value={fontFamily}
                        onChange={e => setFontFamily(e.target.value)}
                        style={{ flex: 1, padding: '5px 8px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '6px', color: '#0f3460', fontSize: '12px' }}
                    >
                        {GOOGLE_FONTS.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </Row>

                {/* Headings label */}
                <span style={{ color: '#e94560', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Headings</span>
                {HEADINGS.map(tag => (
                    <HeadingRow
                        key={tag}
                        tag={tag}
                        values={headings[tag]}
                        onChange={handleHeadingChange}
                    />
                ))}
            </Section>

            {/* Colors Section */}
            <Section title="Colors">
                {Object.entries({
                    primary: 'Primary',
                    secondary: 'Secondary',
                    background: 'Background',
                    text: 'Text',
                    accent: 'Accent',
                }).map(([key, label]) => (
                    <Row key={key} label={label}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                            <input
                                type="color"
                                value={colors[key]}
                                onChange={e => handleColorChange(key, e.target.value)}
                                style={{ width: '32px', height: '28px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={colors[key]}
                                onChange={e => handleColorChange(key, e.target.value)}
                                style={{ flex: 1, padding: '4px 6px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', color: '#0f3460', fontSize: '12px' }}
                            />
                        </div>
                    </Row>
                ))}
            </Section>

            <button
                onClick={handleApply}
                style={{
                    marginTop: '16px',
                    padding: '10px',
                    width: '100%',
                    background: '#e94560',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                Apply Theme
            </button>
        </div>


    );
};

export default ThemePanel;