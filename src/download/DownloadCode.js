const DownloadCode = (editor) => {
  const html = editor.getHtml();
  const css = editor.getCss();
  const js = editor.getJs();

  // Remove any <script> tags from the HTML to avoid duplication
  const cleanHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const htmlWithJs = js
    ? cleanHtml.includes("</body>")
      ? cleanHtml.replace("</body>", `<script>${js}<\/script></body>`)
      : `<body>` + cleanHtml + `<script>${js}<\/script></body>`
    : cleanHtml;

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
          ${htmlWithJs}
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