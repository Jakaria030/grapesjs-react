import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import TopBar from '../components/TopBar';
import LeftSidebar, { BLOCKS } from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Listener from '../listener/Listener';
import Heading from '../domComponents/Heading';
import { useParams } from 'react-router-dom';

const Editor = () => {
    const editorRef = useRef(null);
    const [device, setDevice] = useState('desktop');
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchAndInit = async () => {
            // Fetch project
            const res = await fetch(`http://localhost:3001/projects/${id}`);
            const data = await res.json();
            setProject(data);

            // Initialize GrapesJS
            const editor = grapesjs.init({
                container: '#gjs',
                height: '100%',
                width: '100%',
                storageManager: false,
                panels: { defaults: [] },
                blockManager: { blocks: [] },
                styleManager: { appendTo: null, sectors: [] },
                layerManager: { custom: true },
                traitManager: { appendTo: null },
                deviceManager: {
                    devices: [
                        { name: 'Desktop', width: '' },
                        { name: 'Laptop', width: '1024px' },
                        { name: 'Tablet', width: '768px' },
                        { name: 'Mobile', width: '375px' },
                    ],
                },
                assetManager: { assets: [], upload: false, showUrlInput: true },
                allowScripts: 1,
                canvas: { styles: ['/static/canvasStyle.css'] },
            });

            if (data.gjsData) {
                editor.loadProjectData(data.gjsData);
            }


            editorRef.current = editor;

            // Add blocks
            const bm = editor.BlockManager;
            BLOCKS.forEach((block) => {
                bm.add(block.id, { label: block.label, content: block.content });
            });

            // Initialize listeners
            Listener(editor);
            Heading(editor);
        };

        fetchAndInit();

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [id]);


    // save project data
    const handleSave = async () => {
        const gjsData = editorRef.current.getProjectData();

        const res = await fetch(`http://localhost:3001/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...project, gjsData })
        });

        if (res.ok) {
            alert("Data saved!");
        }
    }


    return (
        <div className="editor-wrapper">
            <TopBar editorRef={editorRef} device={device} setDevice={setDevice} onSave={handleSave} />

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

export default Editor;