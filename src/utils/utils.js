import { BLOCK_STYLES } from '../blockStyles';

export const getHtmlCssJs = (editor) => {
    const rawHtml = editor.getHtml();

    const scripts = [];
    const htmlNoScripts = rawHtml.replace(
        /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
        (match, code) => { scripts.push(code.trim()); return ''; }
    );

    const html = htmlNoScripts.replace(/<\/?body[^>]*>/gi, '').trim();
    const js = scripts.join('\n\n').trim();


    const usedCSS = Object.entries(BLOCK_STYLES)
        .filter(([cls]) => html.includes(`class="${cls}`) || html.includes(`class="${cls} `) || html.includes(` ${cls}`))
        .map(([, css]) => css)
        .join('\n\n');

    const fonts = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`;

    const userCss = editor.getCss()
        .replace(/<\/?style[^>]*>/gi, '')
        .trim();

    const css = `${fonts}\n\n${userCss}\n\n${usedCSS}`.trim();

    return { html, css, js };
};