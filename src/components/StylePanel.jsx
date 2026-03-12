// StylePanel.jsx
import { useState } from 'react';

// ── Property Groups ──────────────────────────────────────

export const DIMENSION_PROPS = [
    { label: 'Width',      property: 'width',      placeholder: '100' },
    { label: 'Height',     property: 'height',      placeholder: '100' },
    { label: 'Min Width',  property: 'min-width',   placeholder: '0'   },
    { label: 'Min Height', property: 'min-height',  placeholder: '0'   },
    { label: 'Max Width',  property: 'max-width',   placeholder: '100' },
    { label: 'Max Height', property: 'max-height',  placeholder: '100' },
];

export const SPACING_PROPS = [
    { label: 'Padding Top',    property: 'padding-top',    placeholder: '0' },
    { label: 'Padding Right',  property: 'padding-right',  placeholder: '0' },
    { label: 'Padding Bottom', property: 'padding-bottom', placeholder: '0' },
    { label: 'Padding Left',   property: 'padding-left',   placeholder: '0' },
    { label: 'Margin Top',     property: 'margin-top',     placeholder: '0' },
    { label: 'Margin Right',   property: 'margin-right',   placeholder: '0' },
    { label: 'Margin Bottom',  property: 'margin-bottom',  placeholder: '0' },
    { label: 'Margin Left',    property: 'margin-left',    placeholder: '0' },
];

export const TYPOGRAPHY_PROPS = [
    { label: 'Font Size',   property: 'font-size',   placeholder: '16', unit: 'px' },
    { label: 'Line Height', property: 'line-height', placeholder: '1.5', unit: ''  },
    { label: 'Letter Spacing', property: 'letter-spacing', placeholder: '0', unit: 'px' },
];

export const FLEX_SELECT_PROPS = [
    {
        label: 'Direction', property: 'flex-direction',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    {
        label: 'Justify Content', property: 'justify-content',
        options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    {
        label: 'Align Items', property: 'align-items',
        options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    },
    {
        label: 'Flex Wrap', property: 'flex-wrap',
        options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    {
        label: 'Align Content', property: 'align-content',
        options: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    },
];

export const FLEX_INPUT_PROPS = [
    { label: 'Gap',      property: 'gap',       placeholder: '0', unit: 'px' },
    { label: 'Flex Grow',   property: 'flex-grow',   placeholder: '0', unit: '' },
    { label: 'Flex Shrink', property: 'flex-shrink', placeholder: '1', unit: '' },
    { label: 'Flex Basis',  property: 'flex-basis',  placeholder: '0', unit: 'px' },
];

const FONT_WEIGHT_OPTIONS = ['100','200','300','400','500','600','700','800','900'];
const TEXT_ALIGN_OPTIONS  = ['left','center','right','justify'];
const TEXT_TRANSFORM_OPTIONS = ['none','uppercase','lowercase','capitalize'];
const TEXT_DECORATION_OPTIONS = ['none','underline','line-through','overline'];

// ── Sub Components ───────────────────────────────────────

const PixelInput = ({ label, property, placeholder, unit = 'px', styles, onChange }) => {
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

const SelectInput = ({ label, property, options, styles, onChange }) => (
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

const ColorInput = ({ label, property, styles, onChange }) => (
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

const Section = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="sp-section">
            <div className="sp-section-header" onClick={() => setOpen(!open)}>
                <span className="sp-section-title">{title}</span>
                <span className="sp-section-arrow">{open ? '▾' : '▸'}</span>
            </div>
            {open && <div className="sp-section-body">{children}</div>}
        </div>
    );
};

// ── Flex Toggle ───────────────────────────────────────────
const FlexToggle = ({ styles, onChange }) => {
    const isFlexEnabled = styles['display'] === 'flex';

    return (
        <>
            <div className="sp-row">
                <label className="sp-label">Enable Flex</label>
                <label className="sp-toggle">
                    <input
                        type="checkbox"
                        checked={isFlexEnabled}
                        onChange={(e) => onChange('display', e.target.checked ? 'flex' : '')}
                    />
                    <span className="sp-toggle-slider" />
                </label>
            </div>

            {isFlexEnabled && (
                <>
                    {FLEX_SELECT_PROPS.map((p) => (
                        <SelectInput key={p.property} {...p} styles={styles} onChange={onChange} />
                    ))}
                    {FLEX_INPUT_PROPS.map((p) => (
                        <PixelInput key={p.property} {...p} styles={styles} onChange={onChange} />
                    ))}
                </>
            )}
        </>
    );
};

// ── Main Style Panel ──────────────────────────────────────
const StylePanel = ({ selectedEl, styles, onChange }) => {
    if (!selectedEl) return (
        <p className="sp-placeholder">Click an element on the canvas to style it</p>
    );

    return (
        <div className="sp-panel">
            <div className="sp-selected-tag">
                &lt;{selectedEl.get('tagName') || 'element'}&gt;
            </div>

            {/* ── Dimension ── */}
            <Section title="Dimension" defaultOpen={true}>
                {DIMENSION_PROPS.map((p) => (
                    <PixelInput key={p.property} {...p} unit="px" styles={styles} onChange={onChange} />
                ))}
            </Section>

            {/* ── Spacing ── */}
            <Section title="Spacing">
                <div className="sp-grid-2">
                    {SPACING_PROPS.map((p) => (
                        <PixelInput key={p.property} {...p} unit="px" styles={styles} onChange={onChange} />
                    ))}
                </div>
            </Section>

            {/* ── Typography ── */}
            <Section title="Typography">
                <ColorInput label="Color" property="color" styles={styles} onChange={onChange} />
                {TYPOGRAPHY_PROPS.map((p) => (
                    <PixelInput key={p.property} {...p} styles={styles} onChange={onChange} />
                ))}
                <SelectInput
                    label="Font Weight"
                    property="font-weight"
                    options={FONT_WEIGHT_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Text Align"
                    property="text-align"
                    options={TEXT_ALIGN_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Transform"
                    property="text-transform"
                    options={TEXT_TRANSFORM_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Decoration"
                    property="text-decoration"
                    options={TEXT_DECORATION_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
            </Section>

            {/* ── Flex ── */}
            <Section title="Flex">
                <FlexToggle styles={styles} onChange={onChange} />
            </Section>

            {/* ── Background ── */}
            <Section title="Background">
                <ColorInput label="Color" property="background-color" styles={styles} onChange={onChange} />
            </Section>

            {/* ── Border ── */}
            <Section title="Border">
                <PixelInput label="Border Width" property="border-width" placeholder="1" unit="px" styles={styles} onChange={onChange} />
                <SelectInput
                    label="Border Style"
                    property="border-style"
                    options={['none','solid','dashed','dotted','double','groove','ridge']}
                    styles={styles}
                    onChange={onChange}
                />
                <ColorInput label="Border Color" property="border-color" styles={styles} onChange={onChange} />
                <PixelInput label="Border Radius" property="border-radius" placeholder="0" unit="px" styles={styles} onChange={onChange} />
            </Section>

        </div>
    );
};

export default StylePanel;