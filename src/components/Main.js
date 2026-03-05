const Main = (editor) => {

    // add main component
    editor.DomComponents.addType("main", {
        model: {
            defaults: {
                tagName: "main",
                droppable: true,
                attributes: { class: "main" },
                style: { padding: "20px", minHeight: "200px" },
                components: [
                    `<h1>Main Heading</h1>
                    <p>This is a paragraph inside the main section. Drag your content here.</p>`
                ]
            },
        },
    });

    // add CSS style
    editor.addStyle(`
    .main {
        padding: 40px 20px;
        min-height: 500px;
        background-color: #f5f5f5;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        
    }

    .main h1 {
        font-size: 36px;
        color: #333;
        margin-bottom: 20px;
        font-family: Arial, sans-serif;
    }

    .main p {
        font-size: 18px;
        line-height: 1.6;
        color: #666;
        font-family: Arial, sans-serif;
    }
    `);
};

export default Main;