import { componentsCategory } from "./categories";

const MainBlock = (editor) => {
    editor.BlockManager.add('main', {
        label: 'Main',
        category: componentsCategory,
        attributes: { class: 'fa fa-square' },
        content: { type: 'main' }
    });
};

export default MainBlock;