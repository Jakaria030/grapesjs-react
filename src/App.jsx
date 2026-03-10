import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './index.css'
import TopBar from './components/TopBar';
import LeftSidebar, { BLOCKS } from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

function App() {
  const editorRef = useRef(null);
  const [device, setDevice] = useState('desktop')

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
        // appendTo: null,
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

    // Register each block with GrapesJS BlockManager
    const bm = editorRef.current.BlockManager;
    BLOCKS.forEach((block) => {
      bm.add(block.id, {
        label: block.label,
        content: block.content,
      });
    });

  }, []);

  return (
    <div className="editor-wrapper">
      <TopBar editorRef={editorRef} device={device} setDevice={setDevice} />

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