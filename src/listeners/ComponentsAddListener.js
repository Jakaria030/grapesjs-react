const ComponentAddListener = (editor) => {
    editor.on('component:add', (component, options) => {
        const wrapper = editor.getWrapper();

        // Move Navbar to top
        if (component.get('type') === 'header' && !component.get('moved-to-top')) {
            component.set('moved-to-top', true);
            wrapper.components().remove(component);
            wrapper.components().add(component, { at: 0 });
        }

        // Move footer to bottom
        if (component.get('type') === 'footer' && !component.get('moved-to-bottom')) {
            component.set('moved-to-bottom', true);
            wrapper.components().remove(component);
            wrapper.components().add(component);
        }
    });
};

export default ComponentAddListener;