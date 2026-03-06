import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { useEffect } from 'react';
import ComponentsPlugin from './plugins/ComponentsPlugin';
import TopPanel from './panels/TopPanel';
import DownloadCodeCommand from './commands/DownloadCodeCommand';
import ResetLocalStorageCommand from './commands/ResetLocalStorageCommand';


const App = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      panels: { defaults: [] },

      plugins: [ComponentsPlugin],
      blockManager: { appendTo: "#blocks" },
    });

    TopPanel(editor);
    DownloadCodeCommand(editor);
    ResetLocalStorageCommand(editor);

    return () => editor.destroy();
  }, []);

  return (
    <>
      <div className="top-panel"></div>
      <div id="gjs"></div>
      <div id="blocks"></div>
    </>
  );
};

export default App;