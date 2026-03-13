import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { BLOCKS } from '../../constants/blocks';
import { registerHeading } from './registerHeading';
import { registerListeners } from './registerListeners';

export const initEditor = ({ gjsData } = {}) => {
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
                { name: 'Desktop', width: ''      },
                { name: 'Laptop',  width: '1024px'},
                { name: 'Tablet',  width: '768px' },
                { name: 'Mobile',  width: '375px' },
            ],
        },
        assetManager: { assets: [], upload: false, showUrlInput: true },
        allowScripts: 1,
        canvas: { styles: ['/static/canvasStyle.css'] },
    });

    if (gjsData) {
        editor.loadProjectData(gjsData);
    }

    // Register blocks
    const bm = editor.BlockManager;
    BLOCKS.forEach((block) => {
        bm.add(block.id, { label: block.label, content: block.content });
    });

    // Register custom component types and listeners
    registerHeading(editor);
    registerListeners(editor);

    return editor;
};
