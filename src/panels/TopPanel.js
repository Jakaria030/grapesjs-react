const TopPanel = (editor) => {
    editor.Panels.addPanel({
        id: 'top-panel',
        buttons: [
            {
                id: "visibility",
                active: true,
                className: "btn-toggle-borders",
                label: "<u>B<u>",
                command: "sw-visibility"
            },
            {
                id: "export",
                className: "btn-open-export",
                label: "EXP",
                command: "export-template"
            },
            {
                id: "show-json",
                className: "btn-show-json",
                label: "JSON",
                context: "show-json",
                command(editor) {
                    editor.Modal.setTitle("Components JSON").setContent(`<textarea style="width: 100%; height: 250px;">${JSON.stringify(editor.getComponents())}</textarea>`).open();
                }
            },
            {
                id: "download-code",
                className: "fa fa-download",
                command: "download-code",
                attributes: { title: "Download HTML" }
            },
            {
                id: "reset",
                className: "btn-reset",
                label: "Reset",
                command: "reset-storage",
            },
        ]
    });
};

export default TopPanel;