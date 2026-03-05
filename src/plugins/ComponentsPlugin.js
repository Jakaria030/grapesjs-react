import LoadBlocks from "../blocks";
import LoadComponents from "../components";
import LoadListener from "../listeners";

const ComponentsPlugin = (editor) => {
    // load blocks
    LoadBlocks(editor);

    // load components
    LoadComponents(editor);

    // load listener
    LoadListener(editor);
};

export default ComponentsPlugin;