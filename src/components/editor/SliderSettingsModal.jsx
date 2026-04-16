import { useEffect, useRef, useState } from "react";

const SliderSettingsModal = ({ isOpen, onClose, onConfirm, initialSlides, initialSettings }) => {
    const [slides, setSlides] = useState([]); // Managed image list
    const [showArrows, setShowArrows] = useState(true);
    const [showPagination, setShowPagination] = useState(true);
    const [paginationType, setPaginationType] = useState('dots');
    const [autoplay, setAutoplay] = useState(true);
    const [autoplaySpeed, setAutoplaySpeed] = useState(3000);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        setSlides(initialSlides || []);
        setShowArrows(initialSettings?.showArrows ?? true);
        setShowPagination(initialSettings?.showPagination ?? true);
        setPaginationType(initialSettings?.paginationType ?? 'dots');
        setAutoplay(initialSettings?.autoplay ?? true);
        setAutoplaySpeed(initialSettings?.autoplaySpeed ?? 3000);
    }, [isOpen, initialSlides, initialSettings]);

    if (!isOpen) return null;

    // --- Image Logic ---
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newSlides = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            file: file
        }));
        const updated = [...slides, ...newSlides];
        setSlides(updated);
    };

    const removeSlide = (index) => {
        const updated = slides.filter((_, i) => i !== index);
        setSlides(updated);
    };

    const moveSlide = (index, direction) => {
        const updated = [...slides];
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= updated.length) return;
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setSlides(updated);
    };

    const handleConfirm = () => {
        onConfirm({
            slides,
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

                {/* Images Section */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #2a2a4a' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>Slider Images ({slides.length})</span>
                        <button
                            onClick={() => fileInputRef.current.click()}
                            style={{ padding: '4px 10px', background: '#3a3a5a', border: 'none', borderRadius: '4px', color: 'white', fontSize: '12px', cursor: 'pointer' }}
                        >
                            + Upload
                        </button>
                        <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
                    </div>

                    {/* Image Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                        {slides.map((slide, index) => (
                            <div key={slide.id || index} style={{ position: 'relative', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #3a3a5a', background: '#0f0f1f' }}>
                                <img src={slide.url} alt="slide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                {/* Overlay Controls */}
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: '0.2s', hover: 'opacity: 1' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                    <button onClick={() => moveSlide(index, -1)} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', margin: '2px' }}>‹</button>
                                    <button onClick={() => removeSlide(index)} style={{ background: '#ff4d4d', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', margin: '2px', color: 'white' }}>×</button>
                                    <button onClick={() => moveSlide(index, 1)} style={{ background: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', margin: '2px' }}>›</button>
                                </div>

                                {/* Order Badge */}
                                <div style={{ position: 'absolute', top: '4px', left: '4px', background: '#5b6cff', color: 'white', fontSize: '10px', padding: '2px 5px', borderRadius: '4px' }}>
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
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