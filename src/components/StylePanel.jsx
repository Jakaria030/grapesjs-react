// StylePanel.jsx
import { useState } from 'react';

// ── Property Groups ──────────────────────────────────────

export const DIMENSION_PROPS = [
    { label: 'Width',      property: 'width',      placeholder: '100' },
    { label: 'Height',     property: 'height',     placeholder: '100' },
    { label: 'Min Width',  property: 'min-width',  placeholder: '0'   },
    { label: 'Min Height', property: 'min-height', placeholder: '0'   },
    { label: 'Max Width',  property: 'max-width',  placeholder: '100' },
    { label: 'Max Height', property: 'max-height', placeholder: '100' },
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
    { label: 'Font Size',      property: 'font-size',      placeholder: '16', unit: 'px' },
    { label: 'Line Height',    property: 'line-height',    placeholder: '1.5', unit: ''  },
    { label: 'Letter Spacing', property: 'letter-spacing', placeholder: '0',  unit: 'px' },
    { label: 'Word Spacing',   property: 'word-spacing',   placeholder: '0',  unit: 'px' },
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
        label: 'Align Self', property: 'align-self',
        options: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
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
    { label: 'Gap',         property: 'gap',         placeholder: '0', unit: 'px' },
    { label: 'Row Gap',     property: 'row-gap',     placeholder: '0', unit: 'px' },
    { label: 'Column Gap',  property: 'column-gap',  placeholder: '0', unit: 'px' },
    { label: 'Flex Grow',   property: 'flex-grow',   placeholder: '0', unit: ''   },
    { label: 'Flex Shrink', property: 'flex-shrink', placeholder: '1', unit: ''   },
    { label: 'Flex Basis',  property: 'flex-basis',  placeholder: '0', unit: 'px' },
    { label: 'Order',       property: 'order',       placeholder: '0', unit: ''   },
];

export const GRID_TEXT_PROPS = [
    { label: 'Template Columns', property: 'grid-template-columns', placeholder: 'repeat(3, 1fr)' },
    { label: 'Template Rows',    property: 'grid-template-rows',    placeholder: 'auto'           },
    { label: 'Template Areas',   property: 'grid-template-areas',   placeholder: '"a b" "c d"'    },
    { label: 'Grid Column',      property: 'grid-column',           placeholder: '1 / 3'          },
    { label: 'Grid Row',         property: 'grid-row',              placeholder: '1 / 2'          },
    { label: 'Grid Area',        property: 'grid-area',             placeholder: 'header'         },
];

export const GRID_SELECT_PROPS = [
    {
        label: 'Auto Flow', property: 'grid-auto-flow',
        options: ['row', 'column', 'dense', 'row dense', 'column dense'],
    },
    {
        label: 'Justify Items', property: 'justify-items',
        options: ['stretch', 'start', 'end', 'center'],
    },
    {
        label: 'Align Items', property: 'align-items',
        options: ['stretch', 'start', 'end', 'center', 'baseline'],
    },
    {
        label: 'Place Items', property: 'place-items',
        options: ['stretch', 'start', 'end', 'center'],
    },
];

export const GRID_INPUT_PROPS = [
    { label: 'Column Gap', property: 'column-gap', placeholder: '0', unit: 'px' },
    { label: 'Row Gap',    property: 'row-gap',    placeholder: '0', unit: 'px' },
    { label: 'Gap',        property: 'gap',        placeholder: '0', unit: 'px' },
];

// ── Constants ─────────────────────────────────────────────

const POSITION_OPTIONS        = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
const OVERFLOW_OPTIONS        = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
const OBJECT_FIT_OPTIONS      = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const FONT_WEIGHT_OPTIONS     = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
const FONT_STYLE_OPTIONS      = ['normal', 'italic', 'oblique'];
const TEXT_ALIGN_OPTIONS      = ['left', 'center', 'right', 'justify'];
const TEXT_TRANSFORM_OPTIONS  = ['none', 'uppercase', 'lowercase', 'capitalize'];
const TEXT_DECORATION_OPTIONS = ['none', 'underline', 'line-through', 'overline'];
const WHITE_SPACE_OPTIONS     = ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'];
const WORD_BREAK_OPTIONS      = ['normal', 'break-all', 'keep-all', 'break-word'];
const TEXT_OVERFLOW_OPTIONS   = ['clip', 'ellipsis'];
const CURSOR_OPTIONS          = ['default', 'pointer', 'text', 'move', 'grab', 'grabbing', 'crosshair', 'not-allowed', 'zoom-in', 'zoom-out', 'wait', 'help', 'none'];
const POINTER_EVENTS_OPTIONS  = ['auto', 'none', 'all'];
const USER_SELECT_OPTIONS     = ['auto', 'none', 'text', 'all'];
const RESIZE_OPTIONS          = ['none', 'both', 'horizontal', 'vertical'];
const SCROLL_BEHAVIOR_OPTIONS = ['auto', 'smooth'];

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

const TextInput = ({ label, property, placeholder, styles, onChange }) => (
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

// ── Grid Toggle ───────────────────────────────────────────

const GridToggle = ({ styles, onChange }) => {
    const isGridEnabled = styles['display'] === 'grid';

    return (
        <>
            <div className="sp-row">
                <label className="sp-label">Enable Grid</label>
                <label className="sp-toggle">
                    <input
                        type="checkbox"
                        checked={isGridEnabled}
                        onChange={(e) => onChange('display', e.target.checked ? 'grid' : '')}
                    />
                    <span className="sp-toggle-slider" />
                </label>
            </div>

            {isGridEnabled && (
                <>
                    {GRID_TEXT_PROPS.map((p) => (
                        <TextInput key={p.property} {...p} styles={styles} onChange={onChange} />
                    ))}
                    {GRID_SELECT_PROPS.map((p) => (
                        <SelectInput key={p.property} {...p} styles={styles} onChange={onChange} />
                    ))}
                    {GRID_INPUT_PROPS.map((p) => (
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
                <SelectInput
                    label="Overflow"
                    property="overflow"
                    options={OVERFLOW_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Overflow X"
                    property="overflow-x"
                    options={OVERFLOW_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Overflow Y"
                    property="overflow-y"
                    options={OVERFLOW_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Object Fit"
                    property="object-fit"
                    options={OBJECT_FIT_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
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
                <TextInput
                    label="Font Family"
                    property="font-family"
                    placeholder="Inter, sans-serif"
                    styles={styles}
                    onChange={onChange}
                />
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
                    label="Font Style"
                    property="font-style"
                    options={FONT_STYLE_OPTIONS}
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
                <SelectInput
                    label="White Space"
                    property="white-space"
                    options={WHITE_SPACE_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Word Break"
                    property="word-break"
                    options={WORD_BREAK_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Text Overflow"
                    property="text-overflow"
                    options={TEXT_OVERFLOW_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <TextInput
                    label="Text Shadow"
                    property="text-shadow"
                    placeholder="1px 1px 4px rgba(0,0,0,0.3)"
                    styles={styles}
                    onChange={onChange}
                />
            </Section>

            {/* ── Position ── */}
            <Section title="Position">
                <SelectInput
                    label="Position"
                    property="position"
                    options={POSITION_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <div className="sp-grid-2">
                    <PixelInput label="Top"    property="top"    placeholder="0" unit="px" styles={styles} onChange={onChange} />
                    <PixelInput label="Right"  property="right"  placeholder="0" unit="px" styles={styles} onChange={onChange} />
                    <PixelInput label="Bottom" property="bottom" placeholder="0" unit="px" styles={styles} onChange={onChange} />
                    <PixelInput label="Left"   property="left"   placeholder="0" unit="px" styles={styles} onChange={onChange} />
                </div>
                <PixelInput label="Z-Index" property="z-index" placeholder="0" unit="" styles={styles} onChange={onChange} />
            </Section>

            {/* ── Flex ── */}
            <Section title="Flex">
                <FlexToggle styles={styles} onChange={onChange} />
            </Section>

            {/* ── Grid ── */}
            <Section title="Grid">
                <GridToggle styles={styles} onChange={onChange} />
            </Section>

            {/* ── Background ── */}
            <Section title="Background">
                <ColorInput label="Color" property="background-color" styles={styles} onChange={onChange} />
                <TextInput
                    label="Image"
                    property="background-image"
                    placeholder="url(...)"
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Size"
                    property="background-size"
                    options={['auto', 'cover', 'contain', '100% 100%', '50% auto']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Position"
                    property="background-position"
                    options={['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Repeat"
                    property="background-repeat"
                    options={['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'round', 'space']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Attachment"
                    property="background-attachment"
                    options={['scroll', 'fixed', 'local']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Blend Mode"
                    property="background-blend-mode"
                    options={['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion']}
                    styles={styles}
                    onChange={onChange}
                />
                <PixelInput label="Opacity" property="opacity" placeholder="1" unit="" styles={styles} onChange={onChange} />
            </Section>

            {/* ── Border ── */}
            <Section title="Border">
                <PixelInput label="Border Width"  property="border-width"  placeholder="1" unit="px" styles={styles} onChange={onChange} />
                <SelectInput
                    label="Border Style"
                    property="border-style"
                    options={['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge']}
                    styles={styles}
                    onChange={onChange}
                />
                <ColorInput label="Border Color"  property="border-color"  styles={styles} onChange={onChange} />
                <PixelInput label="Border Radius" property="border-radius" placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <PixelInput label="Top Width"    property="border-top-width"    placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <PixelInput label="Right Width"  property="border-right-width"  placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <PixelInput label="Bottom Width" property="border-bottom-width" placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <PixelInput label="Left Width"   property="border-left-width"   placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <PixelInput label="Outline Width"  property="outline-width"  placeholder="0" unit="px" styles={styles} onChange={onChange} />
                <SelectInput
                    label="Outline Style"
                    property="outline-style"
                    options={['none', 'solid', 'dashed', 'dotted', 'double']}
                    styles={styles}
                    onChange={onChange}
                />
                <ColorInput label="Outline Color"  property="outline-color"  styles={styles} onChange={onChange} />
                <PixelInput label="Outline Offset" property="outline-offset" placeholder="0" unit="px" styles={styles} onChange={onChange} />
            </Section>

            {/* ── Transform ── */}
            <Section title="Transform">
                <TextInput
                    label="Transform"
                    property="transform"
                    placeholder="rotate(45deg) scale(1.2)"
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Origin"
                    property="transform-origin"
                    options={['center', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right', 'left', 'right']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Style"
                    property="transform-style"
                    options={['flat', 'preserve-3d']}
                    styles={styles}
                    onChange={onChange}
                />
                <PixelInput label="Perspective" property="perspective" placeholder="800" unit="px" styles={styles} onChange={onChange} />
                <SelectInput
                    label="Backface"
                    property="backface-visibility"
                    options={['visible', 'hidden']}
                    styles={styles}
                    onChange={onChange}
                />
            </Section>

            {/* ── Interaction ── */}
            <Section title="Interaction">
                <SelectInput
                    label="Cursor"
                    property="cursor"
                    options={CURSOR_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Pointer Events"
                    property="pointer-events"
                    options={POINTER_EVENTS_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="User Select"
                    property="user-select"
                    options={USER_SELECT_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Resize"
                    property="resize"
                    options={RESIZE_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Scroll Behavior"
                    property="scroll-behavior"
                    options={SCROLL_BEHAVIOR_OPTIONS}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Touch Action"
                    property="touch-action"
                    options={['auto', 'none', 'pan-x', 'pan-y', 'manipulation']}
                    styles={styles}
                    onChange={onChange}
                />
                <SelectInput
                    label="Will Change"
                    property="will-change"
                    options={['auto', 'transform', 'opacity', 'contents']}
                    styles={styles}
                    onChange={onChange}
                />
            </Section>

        </div>
    );
};

export default StylePanel;