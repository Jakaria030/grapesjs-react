const Heading = (editor) => {
    editor.DomComponents.addType('heading', {
        isComponent: (el) => ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName),

        model: {
            defaults: {
                tagName: 'h2',
                editable: true,
                traits: [
                    {
                        type: 'select',
                        name: 'tagName',
                        label: 'Tag',
                        changeProp: true,
                        options: [
                            { value: 'h1', name: 'H1' },
                            { value: 'h2', name: 'H2' },
                            { value: 'h3', name: 'H3' },
                            { value: 'h4', name: 'H4' },
                            { value: 'h5', name: 'H5' },
                            { value: 'h6', name: 'H6' },
                        ],
                    },
                ],
            },
        },
    });
};

export default Heading;