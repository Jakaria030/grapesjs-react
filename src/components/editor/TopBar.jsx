import JSZip from 'jszip';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeModal from './CodeModal';
import { getHtmlCssJs } from '../../utils/getHtmlCssJs';
import { buildFullHtml, buildHtml } from '../../utils/buildFullHtml';
import useVersion from '../../hooks/useVersion';

const DEVICES = [
    { id: 'desktop', icon: '/assets/desktop-mac.png', label: 'Desktop' },
    { id: 'laptop', icon: '/assets/laptop.png', label: 'Laptop' },
    { id: 'tablet', icon: '/assets/tablet.png', label: 'Tablet' },
    { id: 'mobile', icon: '/assets/mobile-solid.png', label: 'Mobile' },
];

const DEVICE_MAP = {
    desktop: 'Desktop',
    laptop: 'Laptop',
    tablet: 'Tablet',
    mobile: 'Mobile',
};

const TopBar = ({ editorRef, device, setDevice, onSave, sliderToolbar, onSliderSettings, projectName, project, setProject, handleUndo, handleRedo, getHistories }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();
    const { versions, loading, getVersionData, saveVersionData } = useVersion(project._id);
    const [version, setVersion] = useState(project.currentVersion);

    const getEditor = () => editorRef.current;

    const handleReset = () => {
        const editor = getEditor();
        if (!editor) return;

        editor.DomComponents.clear();
        editor.UndoManager.clear();
    };

    // const handleExport = () => {
    //     const editor = getEditor();
    //     if (!editor) return;

    //     const fullHtml = buildFullHtml({ ...getHtmlCssJs(editor), title: 'My Page' });
    //     const blob = new Blob([fullHtml], { type: 'text/html' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'my-page.html';
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };

    const handleExport = async () => {
        const editor = getEditor();
        if (!editor) return;

        const pm = editor.Pages;
        const allPages = pm.getAll();
        const currentPageId = pm.getSelected()?.getId();

        const zip = new JSZip();
        const folder = zip.folder(projectName);
        const imagesFolder = folder.folder('assets/images');
        const videosFolder = folder.folder('assets/videos');
        const stylesFolder = folder.folder('styles');
        const scriptsFolder = folder.folder('scripts');

        // collect all media URLs from all pages
        const mediaMap = {}; // {originalUrl: localPath}

        const collectMedia = (html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            doc.querySelectorAll('img[src], video[src], source[src]').forEach(el => {
                const src = el.getAttribute('src');
                if (!src || !src.startsWith('http://localhost:3000')) return;
                if (mediaMap[src]) return; // already collected

                const filename = src.split('/').pop();
                const isVideo = src.includes('/videos/');
                const localPath = isVideo ? `assets/videos/${filename}` : `assets/images/${filename}`;

                mediaMap[src] = localPath;
            });
        };

        //  collect media from all pages first
        allPages.forEach(page => {
            pm.select(page.getId());
            const { html } = getHtmlCssJs(editor);
            collectMedia(html);
        });


        // collect media from all pages first
        const downloadMedia = async () => {
            const entries = Object.entries(mediaMap);
            for (const [url, localPath] of entries) {
                try {
                    const res = await fetch(url);
                    const blob = await res.blob();
                    const isVideo = localPath.includes('/videos/');
                    if (isVideo) {
                        videosFolder.file(localPath.split('/').pop(), blob);
                    } else {
                        imagesFolder.file(localPath.split('/').pop(), blob);
                    }
                } catch (error) {
                    console.warn('failed to download', url);
                }
            }
        }

        await downloadMedia();

        // rewrite src URLs in HTML
        const rewriteSrc = (html) => {
            let result = html;
            Object.entries(mediaMap).forEach(([originalUrl, localPath]) => {
                result = result.replaceAll(originalUrl, localPath);
            });
            return result;
        };

        // rewrite href links
        const rewriteLinks = (html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            doc.querySelectorAll('a[href]').forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('/')) {
                    const linkedSlug = href.slice(1);
                    const matchedPage = allPages.find(p => p.get("slug") === linkedSlug);
                    if (matchedPage) {
                        if (matchedPage.get('type') === 'main') {
                            link.setAttribute('href', `./index.html`);
                        } else {
                            link.setAttribute('href', `./${linkedSlug}.html`);
                        }

                    }
                    return;
                }
            });

            return doc.body.innerHTML;
        }

        // build HTML for each page
        allPages.forEach(page => {
            pm.select(page.getId());

            const { html, css, js } = getHtmlCssJs(editor);

            let slug = page.get('slug') || 'index';
            if (page.get('type') === 'main') {
                slug = 'index';
            }
            const name = page.get('name') || 'Untitled';

            const srcRewritten = rewriteSrc(html);
            const linksRewritten = rewriteLinks(srcRewritten);
            const fullHtml = buildHtml({ html: linksRewritten, title: name, cssSrc: `${css && slug}`, scriptSrc: `${js && slug}` });

            folder.file(`${slug}.html`, fullHtml);
            if (css) stylesFolder.file(`${slug}.css`, css);
            if (js) scriptsFolder.file(`${slug}.js`, js);
        });

        // restore original page
        pm.select(currentPageId);

        // generate and download zip
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}.zip`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePreview = () => {
        const editor = getEditor();
        if (!editor) return;

        const pm = editor.Pages;
        const allPages = pm.getAll();
        const currentPage = pm.getSelected();
        const currentPageId = currentPage?.getId();
        const currentSlug = currentPage?.get('slug') || 'index';

        const pagesData = allPages.map(page => {
            pm.select(page.getId());
            const { html, css, js } = getHtmlCssJs(editor);
            const slug = page.get('slug') || 'index';

            // step 1 — rewrite /slug hrefs
            const rewrittenHtml = html.replace(
                /href=["']([^"']+)["']/g,
                (match, path) => {
                    if (path.startsWith('http')) return match;
                    if (path.startsWith('/preview/')) return match;
                    if (path.startsWith('/')) {
                        const slugPath = path.slice(1);
                        const matchedPage = allPages.find(p => p.get('slug') === slugPath);
                        if (matchedPage) return `href="/preview/${slugPath}"`;
                    }
                    return match;
                }
            );

            // step 2 — match href="#" links by text content
            const parser = new DOMParser();
            const doc = parser.parseFromString(rewrittenHtml, 'text/html');

            doc.querySelectorAll('a[href="#"]').forEach(link => {
                const text = link.textContent.trim().toLowerCase();
                const matchedPage = allPages.find(p =>
                    p.get('name')?.toLowerCase() === text ||
                    p.get('slug')?.toLowerCase() === text
                );
                if (matchedPage) {
                    link.setAttribute('href', `/preview/${matchedPage.get('slug')}`);
                }
            });

            const finalHtml = doc.documentElement.outerHTML;

            return {
                slug,
                name: page.get('name'),
                html: buildFullHtml({ html: finalHtml, css, js, title: page.get('name') }),
            };
        });

        // restore original page
        pm.select(currentPageId);

        sessionStorage.setItem('preview_pages', JSON.stringify(pagesData));
        window.open(`/preview/${currentSlug}`, '_blank');
    };
    const handleCodePreview = () => {
        const editor = getEditor();
        if (!editor) return;

        const { html: html_body, css, js } = getHtmlCssJs(editor);
        const html = buildFullHtml({ html: html_body, css, js: '', title: 'Preview' });
        setModalContent({ html, css, js });
        setModalOpen(true);
    };

    useEffect(() => {
        const editor = getEditor();
        if (!editor) return;
        editor.DeviceManager.select(DEVICE_MAP[device]);
    }, [device]);


    const handleVersionChange = async (e) => {
        const versionNo = Number(e.target.value);

        const data = await getVersionData(versionNo);

        const updatedProject = {
            ...project,
            currentVersion: data.versionNo,
            name: data.versionData.name,
            description: data.versionData.description,
            gjsData: data.versionData.gjsData,
        }

        const histories = await getHistories(updatedProject._id, updatedProject.currentVersion);

        setProject(histories.length === 0 ? updatedProject : histories[histories.length - 1].historyData);
        setVersion(versionNo);

        const id = Number(updatedProject.slug.split("/")[0]);
        const projectName = updatedProject.slug.split("/")[1];
        const updatedData = {
            gjsData: updatedProject.gjsData,
            name: updatedProject.name,
            description: updatedProject.description,
            currentVersion: updatedProject.currentVersion
        }
        await saveVersionData(id, projectName, updatedData);
    }

    return (
        <>
            <div className="topbar">
                <span className="topbar-logo">My Editor</span>
                <div className="topbar-divider" />

                <button className="topbar-btn" onClick={() => navigate('/dashboard')}>↩ Back</button>
                <button className="topbar-btn" onClick={onSave}>💾 Save</button>

                <div className="topbar-divider" />
                {sliderToolbar && <button className="topbar-btn" onClick={onSliderSettings}>⚙ Settings</button>}

                <div className="topbar-version-dropdown">
                    {loading ? (<p>Loading</p>) : (
                        <select value={version} onChange={handleVersionChange}>
                            {versions?.map((v) => (
                                <option key={v._id} value={v.versionNo}>
                                    {`V${v.versionNo}`}
                                </option>
                            ))}

                        </select>
                    )}
                </div>

                <div className="topbar-spacer" />

                <div className="topbar-device-group">
                    {DEVICES.map((d) => (
                        <button
                            key={d.id}
                            className={`device-btn ${device === d.id ? 'active' : ''}`}
                            title={d.label}
                            onClick={() => setDevice(d.id)}
                        >
                            <img src={d.icon} alt={d.label} draggable="false" />
                        </button>
                    ))}
                </div>

                {/* Dropdown (mobile) */}
                <div className="topbar-device-dropdown">
                    <select value={device} onChange={(e) => setDevice(e.target.value)}>
                        {DEVICES.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="topbar-spacer" />

                <button className="topbar-btn preview-btn" onClick={handlePreview}>👁 Preview</button>
                <button className="topbar-btn" onClick={handleUndo}>↩ Undo</button>
                <button className="topbar-btn" onClick={handleRedo}>↪ Redo</button>
                <button className="topbar-btn" onClick={handleReset}>↺ Reset</button>

                <div className="topbar-divider" />

                <button className="topbar-btn code-preview-btn" onClick={handleCodePreview}>Code Preview</button>
                <button className="topbar-btn export-btn" onClick={handleExport}>⬇ Export Code</button>
            </div>

            <CodeModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setModalContent({}); }}
                htmlCode={modalContent.html}
                cssCode={modalContent.css}
                jsCode={modalContent.js}
            />
        </>
    );
};

export default TopBar;
