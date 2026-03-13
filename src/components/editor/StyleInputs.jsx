// components/editor/StyleInputs.jsx
// Reusable input primitives used by StylePanel sections

export const PixelInput = ({ label, property, placeholder, unit = 'px', styles, onChange }) => {
    const raw = styles[property] || '';
    const num = raw.replace(/[^0-9.-]/g, '');

    return (
        <div className="sp-row">
            <label className="sp-label">{label}</label>
            <div className="sp-input-wrap">
                <input
                    className="sp-input"
                    type="number"
                    value={num}
                    placeholder={placeholder}
                    onChange={(e) => onChange(property, e.target.value ? `${e.target.value}${unit}` : '')}
                />
                {unit && <span className="sp-unit">{unit}</span>}
            </div>
        </div>
    );
};

export const TextInput = ({ label, property, placeholder, styles, onChange }) => (
    <div className="sp-row">
        <label className="sp-label">{label}</label>
        <input
            className="sp-input sp-input-full"
            type="text"
            value={styles[property] || ''}
            placeholder={placeholder}
            onChange={(e) => onChange(property, e.target.value)}
        />
    </div>
);

export const SelectInput = ({ label, property, options, styles, onChange }) => (
    <div className="sp-row">
        <label className="sp-label">{label}</label>
        <select
            className="sp-select"
            value={styles[property] || ''}
            onChange={(e) => onChange(property, e.target.value)}
        >
            <option value="">—</option>
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    </div>
);

export const ColorInput = ({ label, property, styles, onChange }) => (
    <div className="sp-row">
        <label className="sp-label">{label}</label>
        <div className="sp-input-wrap">
            <input
                className="sp-color-preview"
                type="color"
                value={styles[property] || '#000000'}
                onChange={(e) => onChange(property, e.target.value)}
            />
            <input
                className="sp-input"
                type="text"
                value={styles[property] || ''}
                placeholder="#000000"
                onChange={(e) => onChange(property, e.target.value)}
            />
        </div>
    </div>
);
