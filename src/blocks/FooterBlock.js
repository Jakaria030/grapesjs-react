import { componentsCategory } from "./categories";

const FooterBlock = (editor) => {
    editor.BlockManager.add('footer', {
        label: 'Footer',
        category: componentsCategory,
        attributes: { class: 'fa fa-copyright' },
        content: { type: 'footer' }
    });
};

export default FooterBlock;