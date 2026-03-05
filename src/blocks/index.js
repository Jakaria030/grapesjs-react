import FooterBlock from "./FooterBlock";
import HeaderBlock from "./HeaderBlock";
import MainBlock from "./MainBlock";

const LoadBlocks = (editor) => {
    HeaderBlock(editor);
    MainBlock(editor);
    FooterBlock(editor);
}

export default LoadBlocks;