import { useState } from "react";

const SliderSettingsModal = ({ isOpen, onClose, onConfirm }) => {
    const [slideCount, setSlideCount] = useState(3);
    const [showArrows, setShowArrows] = useState(true);
    const [showPagination, setShowPagination] = useState(true);
    const [paginationType, setPaginationType] = useState('dots');
    const [autoplay, setAutoplay] = useState(true);
    const [autoplaySpeed, setAutoplaySpeed] = useState(3000);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm({
            slideCount,
            settings: { showArrows, showPagination, paginationType, autoplay, autoplaySpeed }
        });
        onClose();
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', width: '420px', fontFamily: 'sans-serif', color: 'white' }}>

                {/* Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #2a2a4a', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>🖼 Slider Settings</span>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px' }}>✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Slide Count */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#ccc', fontSize: '13px' }}>Number of Slides</span>
                        <input
                            type="number" min={1} max={20} value={slideCount}
                            onChange={e => setSlideCount(Number(e.target.value))}
                            style={{ width: '70px', padding: '5px 8px', background: '#0f0f1f', border: '1px solid #3a3a5a', borderRadius: '6px', color: 'white', textAlign: 'center' }}
                        />
                    </div>

                    {/* Arrows */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#ccc', fontSize: '13px' }}>Show Arrows</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {['On', 'Off'].map(opt => (
                                <button key={opt}
                                    onClick={() => setShowArrows(opt === 'On')}
                                    style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid #3a3a5a', cursor: 'pointer', fontSize: '12px', background: (opt === 'On') === showArrows ? '#5b6cff' : '#0f0f1f', color: (opt === 'On') === showArrows ? 'white' : '#aaa' }}
                                >{opt}</button>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#ccc', fontSize: '13px' }}>Pagination</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {['On', 'Off'].map(opt => (
                                <button key={opt}
                                    onClick={() => setShowPagination(opt === 'On')}
                                    style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid #3a3a5a', cursor: 'pointer', fontSize: '12px', background: (opt === 'On') === showPagination ? '#5b6cff' : '#0f0f1f', color: (opt === 'On') === showPagination ? 'white' : '#aaa' }}
                                >{opt}</button>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Type */}
                    {showPagination && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#ccc', fontSize: '13px' }}>Pagination Type</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {['dots', 'numbers'].map(opt => (
                                    <button key={opt}
                                        onClick={() => setPaginationType(opt)}
                                        style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid #3a3a5a', cursor: 'pointer', fontSize: '12px', background: paginationType === opt ? '#5b6cff' : '#0f0f1f', color: paginationType === opt ? 'white' : '#aaa', textTransform: 'capitalize' }}
                                    >{opt}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Autoplay */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#ccc', fontSize: '13px' }}>Autoplay</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {['On', 'Off'].map(opt => (
                                <button key={opt}
                                    onClick={() => setAutoplay(opt === 'On')}
                                    style={{ padding: '5px 14px', borderRadius: '6px', border: '1px solid #3a3a5a', cursor: 'pointer', fontSize: '12px', background: (opt === 'On') === autoplay ? '#5b6cff' : '#0f0f1f', color: (opt === 'On') === autoplay ? 'white' : '#aaa' }}
                                >{opt}</button>
                            ))}
                        </div>
                    </div>

                    {/* Autoplay Speed */}
                    {autoplay && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#ccc', fontSize: '13px', flexShrink: 0 }}>Speed</span>
                            <input
                                type="range" min={500} max={8000} step={500} value={autoplaySpeed}
                                onChange={e => setAutoplaySpeed(Number(e.target.value))}
                                style={{ flex: 1, accentColor: '#5b6cff', cursor: 'pointer' }}
                            />
                            <span style={{ color: 'white', fontSize: '12px', background: '#0f0f1f', padding: '3px 8px', borderRadius: '6px', border: '1px solid #3a3a5a', minWidth: '68px', textAlign: 'center' }}>
                                {autoplaySpeed} ms
                            </span>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #2a2a4a', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button onClick={onClose} style={{ padding: '7px 18px', borderRadius: '6px', border: '1px solid #3a3a5a', background: 'transparent', color: '#aaa', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleConfirm} style={{ padding: '7px 18px', borderRadius: '6px', border: 'none', background: '#5b6cff', color: 'white', cursor: 'pointer', fontWeight: 600 }}>Apply</button>
                </div>

            </div>
        </div>
    );
};

export default SliderSettingsModal;