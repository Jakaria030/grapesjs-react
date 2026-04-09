import { COMPONENTS } from "../../constants/components";
import { COMPONENTS_SKELETON } from "../../constants/componentSkeleton";
import { styles } from "../../constants/componentsModalStyle";
import { addComponentToCanvas } from "../../utils/sectionUtils";

const ComponentsModal = ({
    setIsComponentsModalOpen,
    activeComponentTab,
    setActiveComponentTab,
    selectedComponentRef }) => {

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>

                {/* Topbar */}
                <div style={{ ...styles.header, color: '#0f3460' }}>
                    <h3>Add Section</h3>
                    <button onClick={() => setIsComponentsModalOpen(false)} style={{ cursor: 'pointer', padding: '4px 6px', outline: 'none', border: '1px solid #0f3460', textAlign: 'center', borderRadius: '999px', background: 'transparent', color: '#0f3460', fontSize: '12px', }}>✕</button>
                </div>

                <div style={styles.body}>

                    {/* Left Tabs */}
                    <div style={styles.sidebar}>
                        {Object.keys(COMPONENTS).map((tab) => (
                            <div
                                key={tab}
                                onClick={() => setActiveComponentTab(tab)}
                                style={{
                                    ...styles.tab,
                                    background: activeComponentTab === tab ? "#e94560" : "#aaa",
                                    borderRadius: '5px',
                                    marginBottom: '5px',
                                }}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Right Content */}
                    <div style={{ width: '100%' }}>
                        <div style={styles.content}>
                            {COMPONENTS_SKELETON[activeComponentTab]?.map((comp, indx) => (
                                <div
                                    key={comp.id}
                                    style={styles.card}
                                    onClick={() => {
                                        addComponentToCanvas(selectedComponentRef.current, COMPONENTS[activeComponentTab][indx].html);
                                        setIsComponentsModalOpen(false);
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: comp.html
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ComponentsModal;