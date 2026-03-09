const ExportTemplateCommand = (editor) => {
    editor.Commands.add("export-template", {
        run(editor) {
            const html = editor.getHtml();
            const css = editor.getCss();
            const js = editor.getJs();

            const modalContent = `
            <div style="display:flex; flex-direction:column; gap:10px">
                
                <div>
                <h3>HTML</h3>
                <textarea style="width:100%; height:150px;">${html}</textarea>
                </div>

                <div>
                <h3>CSS</h3>
                <textarea style="width:100%; height:150px;">${css}</textarea>
                </div>

                <div>
                <h3>JS</h3>
                <textarea style="width:100%; height:150px;">${js}</textarea>
                </div>

            </div>
            `;

            editor.Modal
                .setTitle("Export Code")
                .setContent(modalContent)
                .open();
        }
    });
};

export default ExportTemplateCommand;