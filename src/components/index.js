import CountDown from "./CountDown";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const LoadComponents = (editor) => {
    Header(editor);
    Main(editor);
    CountDown(editor);
    Footer(editor);
};

export default LoadComponents;