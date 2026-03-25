import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { BLOCKS } from '../../constants/blocks';
import { registerHeading } from './registerHeading';
import { registerListeners } from './registerListeners';

export function buildSliderHTML({ slides, settings }) {
    const { showArrows, showPagination, paginationType, autoplay, autoplaySpeed } = settings;

    const slideHTML = slides.map((slide, i) => `
        <div style="min-width:100%;height:100%;position:relative;flex-shrink:0;">
            <img src="${slide.url}" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>
    `).join('');

    const arrowsHTML = showArrows ? `
        <button class="sld-prev" style="position:absolute;top:50%;left:12px;transform:translateY(-50%);background:rgba(0,0,0,0.5);color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:10;">&#8592;</button>
        <button class="sld-next" style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:rgba(0,0,0,0.5);color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:10;">&#8594;</button>
    ` : '';

    const dotsHTML = slides.map((_, i) => `
    <span class="sld-dot" style="width:10px;height:10px;border-radius:50%;background:white;display:inline-block;opacity:${i === 0 ? '1' : '0.4'};cursor:pointer;"></span>
    `).join('');

    const paginationHTML = showPagination ? `
        <div style="position:absolute;bottom:10px;width:100%;display:flex;justify-content:center;gap:6px;z-index:10;">
            ${paginationType === 'dots' ? dotsHTML : `<span class="sld-counter" style="background:rgba(0,0,0,0.5);color:white;font-size:13px;padding:3px 10px;border-radius:12px;">1 / ${slides.length}</span>`}
        </div>
    ` : '';

    // ✅ JS lives inside the HTML — saved by GrapesJS, works everywhere
    const scriptHTML = `
        <script>
        (function() {
            var track = document.currentScript.parentElement.querySelector('.sld-track');
            if (!track) return;

            var total = ${slides.length};
            var current = 0;
            var timer = null;
            var autoplay = ${autoplay};
            var speed = ${autoplaySpeed};
            var showPagination = ${showPagination};
            var paginationType = '${paginationType}';
            var root = track.parentElement;

            function goTo(index) {
                current = (index + total) % total;
                track.style.transform = 'translateX(-' + (current * 100) + '%)';

                if (showPagination && paginationType === 'dots') {
                    var dots = root.querySelectorAll('.sld-dot');
                    dots.forEach(function(d, i) { d.style.opacity = i === current ? '1' : '0.4'; });
                }

                if (showPagination && paginationType === 'numbers') {
                    var counter = root.querySelector('.sld-counter');
                    if (counter) counter.textContent = (current + 1) + ' / ' + total;
                }
            }

            function startAuto() {
                if (!autoplay) return;
                timer = setInterval(function() { goTo(current + 1); }, speed);
            }

            function stopAuto() {
                clearInterval(timer);
                timer = null;
            }

            var prev = root.querySelector('.sld-prev');
            var next = root.querySelector('.sld-next');

            if (prev) prev.addEventListener('click', function() { stopAuto(); goTo(current - 1); startAuto(); });
            if (next) next.addEventListener('click', function() { stopAuto(); goTo(current + 1); startAuto(); });

            if (showPagination && paginationType === 'dots') {
                root.querySelectorAll('.sld-dot').forEach(function(dot, i) {
                    dot.addEventListener('click', function() { stopAuto(); goTo(i); startAuto(); });
                });
            }

            startAuto();
        })();
        <\/script>
    `;

    return `
        <div class="sld-root" style="width:100%;max-width:1400px;height:400px;position:relative;overflow:hidden;background:#111;">
            <div class="sld-track" style="display:flex;height:100%;transition:transform 0.4s ease;">
                ${slideHTML}
            </div>
            ${arrowsHTML}
            ${paginationHTML}
            ${scriptHTML}
        </div>
    `;
}

export function initSliderRuntime(doc, slideCount, settings) {
    const track = doc.querySelector('.sld-track');
    if (!track) return;

    const { showArrows, showPagination, paginationType, autoplay, autoplaySpeed } = settings;

    let current = 0;
    let timer = null;

    function goTo(index) {
        current = (index + slideCount) % slideCount;
        track.style.transform = `translateX(-${current * 100}%)`;

        if (showPagination && paginationType === 'dots') {
            const dots = doc.querySelectorAll('.sld-dot');
            dots.forEach((d, i) => { d.style.opacity = i === current ? '1' : '0.4'; });
        }

        if (showPagination && paginationType === 'numbers') {
            const counter = doc.querySelector('.sld-counter');
            if (counter) counter.textContent = `${current + 1} / ${slideCount}`;
        }
    }

    function startAuto() {
        if (!autoplay) return;
        timer = setInterval(() => goTo(current + 1), autoplaySpeed);
    }

    function stopAuto() {
        clearInterval(timer);
        timer = null;
    }

    const prev = doc.querySelector('.sld-prev');
    const next = doc.querySelector('.sld-next');

    if (prev) prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    if (next) next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

    if (showPagination && paginationType === 'dots') {
        doc.querySelectorAll('.sld-dot').forEach((dot, i) => {
            dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
        });
    }

    startAuto();

}

export const initEditor = ({ gjsData, onAssetOpen } = {}) => {
    const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: '100%',
        storageManager: false,
        panels: { defaults: [] },
        blockManager: { blocks: [] },
        styleManager: { appendTo: null, sectors: [] },
        layerManager: { custom: true },
        traitManager: { appendTo: null },
        deviceManager: {
            devices: [
                { name: 'Desktop', width: '' },
                { name: 'Laptop', width: '1024px' },
                { name: 'Tablet', width: '768px' },
                { name: 'Mobile', width: '375px' },
            ],
        },
        assetManager: {
            custom: true,
        },
        modal: {
            custom: true,
        },
        allowScripts: 1,
        canvas: { styles: ['/static/canvasStyle.css'] },
    });


    editor.DomComponents.addType('image-slider', {
        model: { defaults: { tagName: 'div' } }
    });

    // Register blocks
    const bm = editor.BlockManager;
    BLOCKS.forEach((block) => {
        bm.add(block.id, { label: block.label, content: block.content });
    });

    // Register custom component types and listeners
    registerHeading(editor);
    registerListeners(editor, { onAssetOpen });

    if (gjsData) {
        editor.loadProjectData(gjsData);
    }

    return editor;
};
