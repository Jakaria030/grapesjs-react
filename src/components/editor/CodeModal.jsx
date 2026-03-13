import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';
import parserCss from 'prettier/plugins/postcss';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';

// ── Code Section ──────────────────────────────────────────

const EXTENSION_MAP = {
    html: [html()],
    css: [css()],
    js: [javascript()],
};

const CodeSection = ({ label, code, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-section">
            <div className="code-section-header">
                <span className="code-section-label">{label}</span>
                <button className="copy-btn" onClick={handleCopy}>
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <CodeMirror
                value={code}
                height="200px"
                theme={oneDark}
                extensions={EXTENSION_MAP[language]}
                editable={false}
                basicSetup={{ lineNumbers: true, foldGutter: false }}
            />
        </div>
    );
};

// ── Code Modal ────────────────────────────────────────────

const CodeModal = ({ isOpen, onClose, htmlCode = '', cssCode = '', jsCode = '' }) => {
    const [formattedHtml, setFormattedHtml] = useState('');
    const [formattedCss, setFormattedCss] = useState('');
    const [formattedJs, setFormattedJs] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        const format = async () => {
            try {
                const [fHtml, fCss, fJs] = await Promise.all([
                    prettier.format(htmlCode, { parser: 'html', plugins: [parserHtml, parserEstree] }),
                    prettier.format(cssCode, { parser: 'css', plugins: [parserCss] }),
                    prettier.format(jsCode, { parser: 'babel', plugins: [parserBabel, parserEstree] }),
                ]);
                setFormattedHtml(fHtml);
                setFormattedCss(fCss);
                setFormattedJs(fJs);
            } catch {
                setFormattedHtml(htmlCode);
                setFormattedCss(cssCode);
                setFormattedJs(jsCode);
            }
        };

        format();
    }, [isOpen, htmlCode, cssCode, jsCode]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-title">Code Preview</span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <CodeSection label="HTML" code={formattedHtml} language="html" />
                    <CodeSection label="CSS" code={formattedCss} language="css" />
                    <CodeSection label="JS" code={formattedJs} language="js" />
                </div>
            </div>
        </div>
    );
};

export default CodeModal;
