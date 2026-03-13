import { useState } from 'react';
import LayerPanel from './LayerPanel';

const RightSidebar = ({ editorRef }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`sidebar right-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? '→' : '←'}
            </button>

            {!collapsed && (
                <div className="sidebar-content">
                    <div className="sidebar-title">Layers</div>
                    <LayerPanel editorRef={editorRef} />
                </div>
            )}
        </div>
    );
};

export default RightSidebar;
