import { useState } from "react";

const RightSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={`sidebar right-sidebar ${collapsed ? 'collapsed' : ''}`}>

            {/* Toggle button */}
            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? '→' : '←'}
            </button>

            {/* Sidebar content — hidden when collapsed */}
            {!collapsed && (
                <div className="sidebar-content">
                    <div className="sidebar-title">Layers</div>

                    <p className="tab-placeholder">Layer Comming Soon</p>
                </div>
            )}
        </div>
    )
};

export default RightSidebar;