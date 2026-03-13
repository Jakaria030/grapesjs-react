import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/editor/TopBar';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import { initEditor } from '../lib/editor/initEditor';
import { useProject } from '../hooks/useProject';
import Loading from '../components/ui/Loading';

const Editor = () => {
    const editorRef = useRef(null);
    const [device, setDevice] = useState('desktop');
    const { id } = useParams();
    const { project, loading, saveProject } = useProject(id);

    useEffect(() => {
        if (!project) return;

        const editor = initEditor({ gjsData: project.gjsData });
        editorRef.current = editor;

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [project]);

    const handleSave = async () => {
        if (!editorRef.current) return;
        const gjsData = editorRef.current.getProjectData();
        const ok = await saveProject(gjsData);
        if (ok) alert('Data saved!');
    };

    if (loading) return <Loading />;

    return (
        <div className="editor-wrapper">
            <TopBar
                editorRef={editorRef}
                device={device}
                setDevice={setDevice}
                onSave={handleSave}
            />

            <div className="editor-body">
                <LeftSidebar editorRef={editorRef} />
                <div className="canvas-area">
                    <div id="gjs"></div>
                </div>
                <RightSidebar editorRef={editorRef} />
            </div>
        </div>
    );
};

export default Editor;