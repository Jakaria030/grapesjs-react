// components/ui/Section.jsx
import { useState } from 'react';

const Section = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="sp-section">
            <div className="sp-section-header" onClick={() => setOpen(!open)}>
                <span className="sp-section-title">{title}</span>
                <span className="sp-section-arrow">{open ? '▾' : '▸'}</span>
            </div>
            {open && <div className="sp-section-body">{children}</div>}
        </div>
    );
};

export default Section;
