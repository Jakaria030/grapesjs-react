import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { BLOCKS } from '../../constants/blocks';
import { registerHeading } from './registerHeading';
import { registerListeners } from './registerListeners';

export function buildSliderHTML({ slides, settings }) {
    const { showArrows, showPagination, paginationType, autoplay, autoplaySpeed } = settings;

    const slideHTML = slides.map((slide, i) => `
    <div style="min-width:100%;height:100%;position:relative;flex-shrink:0;pointer-events:none;">
        <img
            src="${slide.url}"
            data-slide-index="${i}"
            class="sld-img"
            style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:all; cursor:pointer;"
        />
    </div>
    `).join('');

    const arrowsHTML = showArrows ? `
    <button class="sld-prev" style="position:absolute;top:50%;left:12px;transform:translateY(-50%);background:rgba(0,0,0,0.5);color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:10;pointer-events:all;">&#8592;</button>
    <button class="sld-next" style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:rgba(0,0,0,0.5);color:white;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;z-index:10;pointer-events:all;">&#8594;</button>
    ` : '';

    const dotsHTML = slides.map((_, i) => `
    <span class="sld-dot" style="width:10px;height:10px;border-radius:50%;background:white;display:inline-block;opacity:${i === 0 ? '1' : '0.4'};cursor:pointer;"></span>
    `).join('');

    const paginationHTML = showPagination ? `
        <div style="position:absolute;bottom:10px;width:100%;display:flex;justify-content:center;gap:6px;z-index:10;">
            ${paginationType === 'dots' ? dotsHTML : `<span class="sld-counter" style="background:rgba(0,0,0,0.5);color:white;font-size:13px;padding:3px 10px;border-radius:12px;">1 / ${slides.length}</span>`}
        </div>
    ` : '';

    const scriptHTML = `
    <script>
        (function() {
            var root = document.currentScript.parentElement;
            var track = root.querySelector('.sld-track');
            if (!track) return;

            var total = ${slides.length};
            var current = 0;
            var timer = null;
            var autoplay = ${autoplay};
            var speed = ${autoplaySpeed};
            var showPagination = ${showPagination};
            var paginationType = '${paginationType}';

            function updatePagination() {
                if (!showPagination) return;
                if (paginationType === 'dots' && autoplay) {
                    root.querySelectorAll('.sld-dot').forEach(function(d, i) {
                        d.style.opacity = i === current ? '1' : '0.4';
                    });
                }
                if (paginationType === 'numbers') {
                    var counter = root.querySelector('.sld-counter');
                    if (counter) counter.textContent = (current + 1) + ' / ' + total;
                }
            }

            function goTo(index) {
                current = (index + total) % total;
                track.style.transform = 'translateX(-' + (current * 100) + '%)';
                updatePagination();
            }

            function startAuto() {
                if (!autoplay) return;
                if (timer) return;
                timer = setInterval(function() { goTo(current + 1); }, speed);
            }

            function stopAuto() {
                clearInterval(timer);
                timer = null;
            }

            // arrows
            var prev = root.querySelector('.sld-prev');
            var next = root.querySelector('.sld-next');
            if (prev) prev.addEventListener('click', function() {
                stopAuto();
                goTo(current - 1);
                startAuto();
            });
            if (next) next.addEventListener('click', function() {
                stopAuto();
                goTo(current + 1);
                startAuto();
            });

            // dots
            if (showPagination && paginationType === 'dots') {
                root.querySelectorAll('.sld-dot').forEach(function(dot, i) {
                    dot.addEventListener('click', function() {
                        stopAuto();
                        goTo(i);
                        startAuto();
                    });
                });
            }

            // init
            updatePagination();
            startAuto();
        })();
    <\/script>
    `;

    return `
        <div class="sld-root"
        data-autoplay="${autoplay}"
        data-speed="${autoplaySpeed}"
        data-arrows="${showArrows}"
        data-pagination="${showPagination}"
        data-pagination-type="${paginationType}"
        data-slide-count="${slides.length}"
        style="width:100%;max-width:1400px;height:400px;position:relative;overflow:hidden;background:#111;pointer-events:all;">
        <div class="sld-track" style="display:flex;height:100%;transition:transform 0.4s ease;pointer-events:none;">
            ${slideHTML}
        </div>
        ${arrowsHTML}
        ${paginationHTML}
        ${scriptHTML}
    </div>
    `;
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
        isComponent: el => el?.classList?.contains('sld-root'),
        model: {
            defaults: {
                tagName: 'div',
                droppable: false,
                selectable: true,
                hoverable: true,
            }
        }
    });

    // Register blocks
    const bm = editor.BlockManager;
    BLOCKS.forEach((block) => {
        bm.add(block.id, { label: block.label, content: block.content });
    });

    // Register custom component types and listeners
    registerHeading(editor);
    registerListeners(editor, { onAssetOpen });

    // register duplicate command
    editor.Commands.add('duplicate-component', {
        run(editor) {
            const selected = editor.getSelected();
            if (!selected) return;

            const parent = selected.parent();
            if (!parent) return;

            const index = selected.index();
            const cloned = selected.clone();

            parent.components().add(cloned, { at: index + 1 });
            editor.select(cloned);
        }
    });

    editor.on('load', () => {
        // prevent browser default ctrl+d
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
            }
        });

    });

    editor.Keymaps.add('duplicate', 'ctrl+d', 'duplicate-component');

    if (gjsData) {
        editor.loadProjectData(gjsData);
    }

    return editor;
};
