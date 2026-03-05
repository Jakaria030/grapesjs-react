const Footer = (editor) => {
    const currentYear = new Date().getFullYear();

    // add footer component
    editor.DomComponents.addType('footer', {
        model: {
            defaults: {
                tagName: 'footer',
                droppable: true,
                attributes: { class: 'footer' },
                components: [`© ${currentYear} All rights reserved.`]
            },
        },
    });

    // add CSS style
    editor.addStyle(`
        .footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }
    `);
};


export default Footer;