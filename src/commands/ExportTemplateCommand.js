const ExportTemplateCommand = (editor) => {
    editor.Commands.add("export-template", {
        async run(editor) {
            try {
                // Prettier v3 - dynamic imports required
                const prettier = await import("prettier");
                const htmlParser = await import("prettier/plugins/html");
                const cssParser = await import("prettier/plugins/postcss");
                const babelParser = await import("prettier/plugins/babel");
                const estreeParser = await import("prettier/plugins/estree");

                const html = editor.getHtml();
                const css = editor.getCss();
                const js = editor.getJs();

                const cleanHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");

                // Fix: htmlParser alone cant format embedded css/js, needs all parsers
                const formattedHtml = await prettier.format(cleanHtml, {
                    parser: "html",
                    plugins: [htmlParser, cssParser, babelParser, estreeParser],
                    tabWidth: 2,
                    printWidth: 80,
                });

                // Fix: css can be empty string, skip formatting if empty
                const formattedCss = css
                    ? await prettier.format(css, {
                        parser: "css",
                        plugins: [cssParser],
                        tabWidth: 2,
                        printWidth: 80,
                    })
                    : "";

                // Fix: estree is required for babel parser
                const formattedJs = js
                    ? await prettier.format(js, {
                        parser: "babel",
                        plugins: [babelParser, estreeParser],
                        tabWidth: 2,
                        printWidth: 80,
                    })
                    : "";

                // Open modal first so DOM is ready
                editor.Modal.setTitle("Export Code")
                    .setContent(`
                        <div style="display:flex; flex-direction:column; gap:16px; padding:10px;">

                            <div>
                                <h3 style="margin-bottom:6px;">HTML</h3>
                                <div id="cm-html" style="height:200px; border:1px solid #444; border-radius:4px; overflow-y:scroll;"></div>
                            </div>

                            <div>
                                <h3 style="margin-bottom:6px;">CSS</h3>
                                <div id="cm-css" style="height:200px; border:1px solid #444; border-radius:4px; overflow-y:scroll;"></div>
                            </div>

                            <div>
                                <h3 style="margin-bottom:6px;">JS</h3>
                                <div id="cm-js" style="height:200px; border:1px solid #444; border-radius:4px; overflow-y:scroll;"></div>
                            </div>

                        </div>
                    `)
                    .open();

                // Wait for modal DOM to render before mounting CodeMirror
                await new Promise((resolve) => setTimeout(resolve, 50));

                // CodeMirror dynamic imports
                const { EditorView, basicSetup } = await import("codemirror");
                const { html: langHtml } = await import("@codemirror/lang-html");
                const { css: langCss } = await import("@codemirror/lang-css");
                const { javascript: langJs } = await import("@codemirror/lang-javascript");
                const { oneDark } = await import("@codemirror/theme-one-dark");

                // Helper to mount CodeMirror into a container
                const createEditor = (elementId, content, language) => {
                    const container = document.getElementById(elementId);
                    if (!container) return;

                    new EditorView({
                        doc: content,
                        extensions: [
                            basicSetup,
                            language,
                            oneDark,
                            EditorView.editable.of(false),
                            EditorView.lineWrapping,
                        ],
                        parent: container,
                    });
                };

                createEditor("cm-html", formattedHtml, langHtml());
                createEditor("cm-css", formattedCss, langCss());
                createEditor("cm-js", formattedJs, langJs());

            } catch (error) {
                console.error("Export error:", error);
            }
        },
    });
};

export default ExportTemplateCommand;