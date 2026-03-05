import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { useEffect } from 'react';
import ComponentsPlugin from './plugins/ComponentsPlugin';


const App = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      storageManager: false,
      plugins: [ComponentsPlugin],
    });

    return () => editor.destroy();
  }, []);

  return <div id="gjs"></div>;
};

export default App;