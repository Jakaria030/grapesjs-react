const DownloadCode = (editor) => {
    const html = editor.getHtml();
    const css = editor.getCss();

    const code = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset='UTF-8'/>
          <title>Export</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();

    URL.revokeObjectURL(url);
};

export default DownloadCode;
