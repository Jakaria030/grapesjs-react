import DownloadCode from "../download/DownloadCode";

const DownloadCodeCommand = (editor) => {
    editor.Commands.add("download-code", {
        run(editor){
            DownloadCode(editor);
        }
    })
};

export default DownloadCodeCommand;