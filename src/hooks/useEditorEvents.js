import { useEffect, useState } from 'react';
import { ALL_STYLE_PROP_GROUPS } from '../constants/styleProps';

const HEADING_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

export const useEditorEvents = (editorRef) => {
    const [selectedEl, setSelectedEl] = useState(null);
    const [styles, setStyles] = useState({});
    const [selectedHeading, setSelectedHeading] = useState(null);
    const [headingTag, setHeadingTag] = useState('h2');
    const [headingToolbarOpen, setHeadingToolbarOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const editor = editorRef.current;
            if (!editor) return;
            clearInterval(interval);

            editor.on('component:selected', (component) => {
                setSelectedEl(component);

                // Read current styles
                const currentStyles = {};
                ALL_STYLE_PROP_GROUPS.forEach((group) => {
                    group.forEach(({ property }) => {
                        currentStyles[property] = component.getStyle()[property] || '';
                    });
                });
                setStyles(currentStyles);

                // Heading toolbar
                const el = component.getEl();
                const tag = el?.tagName;
                if (HEADING_TAGS.includes(tag)) {
                    setSelectedHeading(component);
                    setHeadingTag(tag.toLowerCase());
                    setHeadingToolbarOpen(true);
                } else {
                    setHeadingToolbarOpen(false);
                    setSelectedHeading(null);
                }
            });

            editor.on('component:deselected', () => {
                setSelectedEl(null);
                setStyles({});
                setHeadingToolbarOpen(false);
                setSelectedHeading(null);
            });
        }, 300);

        return () => clearInterval(interval);
    }, [editorRef]);

    const handleStyleChange = (property, value) => {
        setStyles((prev) => ({ ...prev, [property]: value }));
        if (selectedEl) {
            selectedEl.addStyle({ [property]: value });
        }
    };

    const handleHeadingChange = (newTag) => {
        if (!selectedHeading) return;
        selectedHeading.set('tagName', newTag);
        setHeadingTag(newTag);
    };

    return {
        selectedEl,
        styles,
        selectedHeading,
        headingTag,
        headingToolbarOpen,
        handleStyleChange,
        handleHeadingChange,
    };
};
