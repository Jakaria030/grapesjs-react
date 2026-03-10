export const getHtmlCssJs = (editor) => {
    const htmlWithScript = editor.getHtml();
    const css = editor.getCss();
    const js = editor.getJs();

    const cleanHtml = htmlWithScript.replace(/<script[\s\S]*?<\/script>/gi, "");
    const html = cleanHtml.replace(/<\/?body[^>]*>/gi, '');

    return { html, css, js };
};