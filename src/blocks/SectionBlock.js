import { basicCategory } from "./categories";

const SectionBlock = (editor) => {
    editor.BlockManager.add("section", {
        label: "Section",
        category: basicCategory,
        attributes: { class: "fa fa-cube" },

        content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
    });
};

export default SectionBlock;