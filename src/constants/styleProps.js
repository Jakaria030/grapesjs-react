
export const DIMENSION_PROPS = [
    { label: 'Width', property: 'width', placeholder: '100' },
    { label: 'Height', property: 'height', placeholder: '100' },
    { label: 'Min Width', property: 'min-width', placeholder: '0' },
    { label: 'Min Height', property: 'min-height', placeholder: '0' },
    { label: 'Max Width', property: 'max-width', placeholder: '100' },
    { label: 'Max Height', property: 'max-height', placeholder: '100' },
];

export const SPACING_PROPS = [
    { label: 'Padding Top', property: 'padding-top', placeholder: '0' },
    { label: 'Padding Right', property: 'padding-right', placeholder: '0' },
    { label: 'Padding Bottom', property: 'padding-bottom', placeholder: '0' },
    { label: 'Padding Left', property: 'padding-left', placeholder: '0' },
    { label: 'Margin Top', property: 'margin-top', placeholder: '0' },
    { label: 'Margin Right', property: 'margin-right', placeholder: '0' },
    { label: 'Margin Bottom', property: 'margin-bottom', placeholder: '0' },
    { label: 'Margin Left', property: 'margin-left', placeholder: '0' },
];

export const TYPOGRAPHY_PROPS = [
    { label: 'Font Size', property: 'font-size', placeholder: '16', unit: 'px' },
    { label: 'Line Height', property: 'line-height', placeholder: '1.5', unit: '' },
    { label: 'Letter Spacing', property: 'letter-spacing', placeholder: '0', unit: 'px' },
    { label: 'Word Spacing', property: 'word-spacing', placeholder: '0', unit: 'px' },
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
    { label: 'Gap', property: 'gap', placeholder: '0', unit: 'px' },
    { label: 'Row Gap', property: 'row-gap', placeholder: '0', unit: 'px' },
    { label: 'Column Gap', property: 'column-gap', placeholder: '0', unit: 'px' },
    { label: 'Flex Grow', property: 'flex-grow', placeholder: '0', unit: '' },
    { label: 'Flex Shrink', property: 'flex-shrink', placeholder: '1', unit: '' },
    { label: 'Flex Basis', property: 'flex-basis', placeholder: '0', unit: 'px' },
    { label: 'Order', property: 'order', placeholder: '0', unit: '' },
];

export const GRID_TEXT_PROPS = [
    { label: 'Template Columns', property: 'grid-template-columns', placeholder: 'repeat(3, 1fr)' },
    { label: 'Template Rows', property: 'grid-template-rows', placeholder: 'auto' },
    { label: 'Template Areas', property: 'grid-template-areas', placeholder: '"a b" "c d"' },
    { label: 'Grid Column', property: 'grid-column', placeholder: '1 / 3' },
    { label: 'Grid Row', property: 'grid-row', placeholder: '1 / 2' },
    { label: 'Grid Area', property: 'grid-area', placeholder: 'header' },
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
    { label: 'Row Gap', property: 'row-gap', placeholder: '0', unit: 'px' },
    { label: 'Gap', property: 'gap', placeholder: '0', unit: 'px' },
];

// ── Select option lists ───────────────────────────────────

export const POSITION_OPTIONS = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
export const OVERFLOW_OPTIONS = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
export const OBJECT_FIT_OPTIONS = ['fill', 'contain', 'cover', 'none', 'scale-down'];
export const FONT_WEIGHT_OPTIONS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
export const FONT_STYLE_OPTIONS = ['normal', 'italic', 'oblique'];
export const TEXT_ALIGN_OPTIONS = ['left', 'center', 'right', 'justify'];
export const TEXT_TRANSFORM_OPTIONS = ['none', 'uppercase', 'lowercase', 'capitalize'];
export const TEXT_DECORATION_OPTIONS = ['none', 'underline', 'line-through', 'overline'];
export const WHITE_SPACE_OPTIONS = ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'];
export const WORD_BREAK_OPTIONS = ['normal', 'break-all', 'keep-all', 'break-word'];
export const TEXT_OVERFLOW_OPTIONS = ['clip', 'ellipsis'];
export const CURSOR_OPTIONS = ['default', 'pointer', 'text', 'move', 'grab', 'grabbing', 'crosshair', 'not-allowed', 'zoom-in', 'zoom-out', 'wait', 'help', 'none'];
export const POINTER_EVENTS_OPTIONS = ['auto', 'none', 'all'];
export const USER_SELECT_OPTIONS = ['auto', 'none', 'text', 'all'];
export const RESIZE_OPTIONS = ['none', 'both', 'horizontal', 'vertical'];
export const SCROLL_BEHAVIOR_OPTIONS = ['auto', 'smooth'];
export const TRANSFORM_ORIGIN_OPTIONS = ['center', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right', 'left', 'right'];
export const BG_SIZE_OPTIONS = ['auto', 'cover', 'contain', '100% 100%', '50% auto'];
export const BG_POSITION_OPTIONS = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'];
export const BG_REPEAT_OPTIONS = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'round', 'space'];
export const BG_ATTACHMENT_OPTIONS = ['scroll', 'fixed', 'local'];
export const BG_BLEND_OPTIONS = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'];
export const BORDER_STYLE_OPTIONS = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'];
export const OUTLINE_STYLE_OPTIONS = ['none', 'solid', 'dashed', 'dotted', 'double'];
export const TRANSFORM_STYLE_OPTIONS = ['flat', 'preserve-3d'];
export const BACKFACE_OPTIONS = ['visible', 'hidden'];
export const TOUCH_ACTION_OPTIONS = ['auto', 'none', 'pan-x', 'pan-y', 'manipulation'];
export const WILL_CHANGE_OPTIONS = ['auto', 'transform', 'opacity', 'contents'];

// ── All props flat list (used for reading styles on select) ──
export const ALL_STYLE_PROP_GROUPS = [
    DIMENSION_PROPS,
    SPACING_PROPS,
    TYPOGRAPHY_PROPS,
    FLEX_SELECT_PROPS,
    FLEX_INPUT_PROPS,
    GRID_TEXT_PROPS,
    GRID_SELECT_PROPS,
    GRID_INPUT_PROPS,
];
