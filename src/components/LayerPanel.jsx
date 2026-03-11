import { useEffect, useState } from "react";

// ── tag config ──────────────────────────────────────────
const TAG_CONFIG = {
    body:    { color: '#5b6cff', icon: '■' },
    div:     { color: '#5b6cff', icon: '■' },
    section: { color: '#ff5b8d', icon: '■' },
    article: { color: '#ff5b8d', icon: '■' },
    main:    { color: '#ff5b8d', icon: '■' },
    aside:   { color: '#ff5b8d', icon: '■' },
    header:  { color: '#ff5b8d', icon: '■' },
    footer:  { color: '#ff5b8d', icon: '■' },
    nav:     { color: '#ff5b8d', icon: '■' },
    h1:      { color: '#ffd15b', icon: '■' },
    h2:      { color: '#ffd15b', icon: '■' },
    h3:      { color: '#ffd15b', icon: '■' },
    h4:      { color: '#ffd15b', icon: '■' },
    h5:      { color: '#ffd15b', icon: '■' },
    h6:      { color: '#ffd15b', icon: '■' },
    p:       { color: '#3ddc84', icon: '■' },
    span:    { color: '#3ddc84', icon: '■' },
    a:       { color: '#3ddc84', icon: '■' },
    button:  { color: '#5b6cff', icon: '■' },
    input:   { color: '#5b6cff', icon: '■' },
    form:    { color: '#5b6cff', icon: '■' },
    img:     { color: '#ff9f5b', icon: '■' },
    video:   { color: '#ff9f5b', icon: '■' },
    audio:   { color: '#ff9f5b', icon: '■' },
    iframe:  { color: '#ff9f5b', icon: '■' },
    ul:      { color: '#3ddc84', icon: '■' },
    ol:      { color: '#3ddc84', icon: '■' },
    li:      { color: '#3ddc84', icon: '■' },
    table:   { color: '#5b6cff', icon: '■' },
    tr:      { color: '#5b6cff', icon: '■' },
    td:      { color: '#5b6cff', icon: '■' },
    th:      { color: '#5b6cff', icon: '■' },
};

const getConfig = (tagName) =>
    TAG_CONFIG[tagName?.toLowerCase()] || { color: '#aaa', icon: '◻' };

// ── flatten tree ─────────────────────────────────────────
const flattenLayers = (components, depth = 0, result = [], openMap = {}) => {
    if (!components?.models) return result;

    components.models.forEach((comp) => {
        if(comp.get('tagName') === 'script') return;
        
        const id    = comp.cid;
        const tag   = comp.get('tagName') || comp.get('type') || 'div';
        const label = comp.get('name') || tag;
        const children = comp.get('components');
        const hasChildren = children?.models?.length > 0;

        result.push({ id, label, tag, depth, comp, hasChildren });

        if (hasChildren && openMap[id] !== false) {
            flattenLayers(children, depth + 1, result, openMap);
        }
    });

    return result;
};

// ── LayerRow ─────────────────────────────────────────────
const LayerRow = ({ item, editor, openMap, onToggleOpen }) => {
    const { id, label, tag, depth, comp, hasChildren } = item;
    const { color, icon } = getConfig(tag);

    const isSelected = editor.getSelected()?.cid === id;
    const isVisible  = comp.get('visible') !== false;
    const isOpen     = openMap[id] !== false;

    const toggleVisible = (e) => {
        e.stopPropagation();
        comp.set('visible', !isVisible);
        const el = comp.getEl();
        if (el) el.style.display = isVisible ? 'none' : '';
    };

    return (
        <div
            className={`lyr-row ${isSelected ? 'lyr-selected' : ''} ${!isVisible ? 'lyr-hidden' : ''}`}
            style={{ paddingLeft: 8 + depth * 14 }}
            onClick={() => editor.select(comp)}
        >
            {/* tree line + arrow */}
            <span
                className="lyr-arrow"
                style={{ opacity: hasChildren ? 1 : 0, pointerEvents: hasChildren ? 'auto' : 'none' }}
                onClick={(e) => { e.stopPropagation(); onToggleOpen(id); }}
            >
                {isOpen ? '▾' : '▸'}
            </span>

            {/* icon */}
            <span className="lyr-icon" style={{ color }}>{icon}</span>

            {/* label */}
            <span className="lyr-label">{label}</span>

            {/* tag badge */}
            <span className="lyr-tag">{tag}</span>

            {/* actions */}
            <div className="lyr-actions">
                <button
                    className={`lyr-btn ${!isVisible ? 'lyr-btn-off' : ''}`}
                    onClick={toggleVisible}
                    title="Toggle visibility"
                >
                    {isVisible ? '👁' : '🙈'}
                </button>
            </div>
        </div>
    );
};

// ── Main Layer Panel ──────────────────────────────────────
const LayerPanel = ({ editorRef }) => {
    const [layers,  setLayers]  = useState([]);
    const [openMap, setOpenMap] = useState({});

    const rebuildLayers = () => {
        if (!editorRef?.current) return;

        const root = editorRef.current.DomComponents.getWrapper();
        const flat = flattenLayers(root.get('components'), 0, [], openMap);
        console.log(flat)
        setLayers(flat);
    };

    const toggleOpen = (id) => {
        setOpenMap((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!editorRef?.current) return;
            clearInterval(interval);

            const editor = editorRef.current;

            editor.on('layer:root',          rebuildLayers);
            editor.on('layer:component',     rebuildLayers);
            editor.on('component:add',       rebuildLayers);
            editor.on('component:remove',    rebuildLayers);

        }, 100);

        return () => clearInterval(interval);
    }, []);

    // rebuild when openMap changes
    useEffect(() => { rebuildLayers(); }, [openMap]);



    return (
        <div className="lyr-panel">
            {layers.length === 0 ? (
                <p className="lyr-empty">Drop components to see layers</p>
            ) : (
                layers.map((item) => (
                    <LayerRow
                        key={item.id}
                        item={item}
                        editor={editorRef.current}
                        openMap={openMap}
                        onToggleOpen={toggleOpen}
                    />
                ))

            )}
        </div>
    );
};

export default LayerPanel;