import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const LoadComponents = (editor) => {
    Header(editor);
    Main(editor);
    Footer(editor);
};

export default LoadComponents;