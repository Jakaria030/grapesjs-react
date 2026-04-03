
export const buildFullHtml = ({ html, css, js, title = 'My Page' }) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>${css}</style>
    </head>
    <body>
        ${html}
        <script>${js}</script>
    </body>
    </html>`.trim();
};

export const buildHtml = ({ html, title = 'My Page', cssSrc = "", scriptSrc = "" }) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        ${cssSrc ? `<link rel="stylesheet" href="./styles/${cssSrc}.css">` : ""}
    </head>
    <body>
        ${html}
        ${scriptSrc ? `<script src="./scripts/${scriptSrc}.js"></script>` : ""}
    </body>
    </html>`.trim();
};