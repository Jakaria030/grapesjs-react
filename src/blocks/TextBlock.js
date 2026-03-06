import { basicCategory } from "./categories";

const TextBlock = (editor) => {
    editor.BlockManager.add("text", {
        label: "Text",
        category: basicCategory,
        attributes: { class: "fa fa-font" },

        content: `<h1>This is just a Lorem text: Lorem ipsum dolor sit amet</h1>`,
    });
};

export default TextBlock;