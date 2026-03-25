import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/editor/TopBar';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import { initEditor } from '../lib/editor/initEditor';
import { useProject } from '../hooks/useProject';
import Loading from '../components/ui/Loading';
import AssetManagerModal from '../components/dashboard/AssetManagerModal';
import SliderSettingsModal from '../components/editor/SliderSettingsModal';

const Editor = () => {
    const editorRef = useRef(null);
    const [device, setDevice] = useState('desktop');
    const { id } = useParams();
    const { project, loading, saveProject } = useProject(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assetProps, setAssetProps] = useState(null);
    const [sliderModalOpen, setSliderModalOpen] = useState(false);


    useEffect(() => {
        if (!project) return;

        const editor = initEditor({
            gjsData: project.gjsData,
            onAssetOpen: (props) => {
                setAssetProps(props);
                setIsModalOpen(true);
            },
        });

        editorRef.current = editor;

        editor.on("block:drag:stop", (component) => {
            if (!component) return;
            if (component.get('type') === 'image-slider') {
                setSliderModalOpen(true);
            }
        });

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

            <AssetManagerModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    assetProps?.close();
                }}
                assetProps={assetProps}
                projectId={id}
            />

            <SliderSettingsModal
                isOpen={sliderModalOpen}
                onClose={() => setSliderModalOpen(false)}
                onConfirm={(data) => console.log(data)}
            />

        </div>
    );
};

export default Editor;