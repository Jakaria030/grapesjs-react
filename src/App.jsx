import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './index.css'
import TopBar from './components/TopBar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

function App() {
  const editorRef = useRef(null);

  useEffect(() => {
    // Only init once
    if (editorRef.current) return;

    editorRef.current = grapesjs.init({
      container: '#gjs',
      height: '100%',
      width: '100%',
      storageManager: false,

      // Remove all default panels
      panels: {
        defaults: [],
      },

      // Remove default block manager UI
      blockManager: {
        appendTo: null,
        blocks: [],
      },

      // Remove default style manager UI
      styleManager: {
        appendTo: null,
        sectors: [],
      },

      // Remove default layer manager UI
      layerManager: {
        appendTo: null,
      },

      // Remove default trait manager UI
      traitManager: {
        appendTo: null,
      }

    });

  }, []);

  return (
    <div className="editor-wrapper">
      <TopBar editorRef={editorRef} />

      <div className="editor-body">
        <LeftSidebar editorRef={editorRef} />

        <div className="canvas-area">
          <div id="gjs"></div>
        </div>

        <RightSidebar editorRef={editorRef} />
      </div>

    </div>
  );
}

export default App;