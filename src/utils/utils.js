export const getHtmlCssJs = (editor) => {
    const rawHtml = editor.getHtml();
    const rawCss = editor.getCss();

    // ── extract JS from <script> tags & remove them from html ──
    const scripts = [];
    const htmlNoScripts = rawHtml.replace(
        /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
        (match, code) => {
            scripts.push(code.trim());
            return '';
        }
    );

    // ── remove <body> tags ──
    const html = htmlNoScripts
        .replace(/<\/?body[^>]*>/gi, '')
        .trim();

    // ── remove <style> wrapper from css ──
    const css = rawCss
        .replace(/<\/?style[^>]*>/gi, '')
        .trim();

    // ── join all scripts ──
    const js = scripts.join('\n\n').trim();

    return { html, css, js };
};