import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/editor/TopBar';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import { buildSliderHTML, initEditor, } from '../lib/editor/initEditor';
import { useProject } from '../hooks/useProject';
import Loading from '../components/ui/Loading';
import AssetManagerModal from '../components/dashboard/AssetManagerModal';
import SliderSettingsModal from '../components/editor/SliderSettingsModal';

const Editor = () => {
    const editorRef = useRef(null);
    const [device, setDevice] = useState('desktop');
    const { id, slug } = useParams();
    const { project, loading, saveProject } = useProject(`${id}/${slug}`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assetProps, setAssetProps] = useState(null);
    const [sliderModalOpen, setSliderModalOpen] = useState(false);
    const [sliderComponent, setSliderComponent] = useState(null);
    const [sliderToolbar, setSliderToolbar] = useState(false);

    const [sliderInitialSlides, setSliderInitialSlides] = useState(null);
    const [sliderInitialSettings, setSliderInitialSettings] = useState(null);

    useEffect(() => {
        if (!project) return;

        const editor = initEditor({
            gjsData: project.gjsData,
            onAssetOpen: (props) => {
                setAssetProps(props);
                setIsModalOpen(true);
            },
        });


        editor.on("block:drag:stop", (component) => {
            if (!component) return;
            if (component.get('type') === 'image-slider') {
                setSliderComponent(component);
                setSliderModalOpen(true);
            }
        });

        editor.on('component:selected', (component) => {
            if (component.get('type') !== 'image-slider') return;
            const el = component.getEl();
            if (!el) return;

            setSliderToolbar(true);
        });

        editor.on('component:deselected', () => {
            setSliderToolbar(false);
        });

        editor.on('load', () => {
            const iframe = editor.Canvas.getFrameEl();
            const doc = iframe.contentDocument;

            doc.addEventListener("contextmenu", (e) => {
                const sliderRoot = e.target.closest(".sld-root");
                if (!sliderRoot) return;

                e.preventDefault()

                function findeComponent(components, el) {
                    for (let i = 0; i < components.length; i++) {
                        const com = components.at(i);
                        if (com.getEl() === el) return com;

                        const found = findeComponent(com.components(), el);
                        if (found) return found;
                    }
                    return null;
                }


                const component = findeComponent(editor.DomComponents.getComponents(), sliderRoot);

                if (component) {
                    editor.select(component);
                }
            })
        });

        editorRef.current = editor;

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [project]);

    const getSliderDataFromComponent = (component) => {
        const el = component?.getEl();
        if (!el) return { slides: [], settings: {} };

        const settings = {
            autoplay: el.dataset.autoplay === 'true',
            autoplaySpeed: Number(el.dataset.speed) || 3000,
            showArrows: el.dataset.arrows === 'true',
            showPagination: el.dataset.pagination === 'true',
            paginationType: el.dataset.paginationType || 'dots',
        };

        const imgEls = el.querySelectorAll('.sld-img');
        const slides = Array.from(imgEls).map((img) => ({
            url: img.src,
            caption: '',
        }));

        return { slides, settings };
    };


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
                sliderToolbar={sliderToolbar}
                projectName={slug}
                onSliderSettings={() => {
                    const comp = editorRef.current?.getSelected();
                    if (!comp) return;

                    const { slides, settings } = getSliderDataFromComponent(comp);

                    comp.set('slides', slides);
                    comp.set('settings', settings);

                    setSliderComponent(comp);
                    setSliderInitialSlides(slides);
                    setSliderInitialSettings(settings);
                    setSliderModalOpen(true);
                }}
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
                projectId={project._id}
            />

            <SliderSettingsModal
                isOpen={sliderModalOpen}
                onClose={() => setSliderModalOpen(false)}
                initialSlides={sliderInitialSlides}
                initialSettings={sliderInitialSettings}
                onConfirm={({ slideCount, settings }) => {
                    if (!sliderComponent) return;

                    const slides = Array.from({ length: slideCount }, (_, i) => ({
                        url: `https://placehold.co/800x400/ddd/000?text=Slide+${i + 1}`,
                        caption: `Slide ${i + 1}`,
                    }));

                    const html = buildSliderHTML({ slides, settings });
                    sliderComponent.components(html);
                }}
            />

        </div>
    );
};

export default Editor;