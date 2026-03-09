import { componentsCategory } from "./categories";

const CountDownBlock = (editor) => {
    editor.BlockManager.add('countdown-block', {
        label: "Countdown",
        category: componentsCategory,
        attributes: { class: 'fa fa-clock-o' },
        content: {
            type: "countdown"
        }
    });
};

export default CountDownBlock;