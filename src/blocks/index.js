import FooterBlock from "./FooterBlock";
import HeaderBlock from "./HeaderBlock";
import MainBlock from "./MainBlock";
import SectionBlock from "./SectionBlock";
import TextBlock from "./TextBlock";

const LoadBlocks = (editor) => {
    // basic blocks
    SectionBlock(editor);
    TextBlock(editor);
    
    // components block
    HeaderBlock(editor);
    MainBlock(editor);
    FooterBlock(editor);
}

export default LoadBlocks;