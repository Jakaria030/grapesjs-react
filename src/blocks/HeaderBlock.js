import { componentsCategory } from "./categories";

const HeaderBlock = (editor) => {
    editor.BlockManager.add('header', {
        label: 'Header',
        category: componentsCategory,
        attributes: { class: 'fa fa-bars' },
        content: { type: 'header' }
    });
};

export default HeaderBlock;