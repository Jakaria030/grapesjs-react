export const isSection = (component) => {
    const el = component?.getEl();
    return el && (el.tagName === "SECTION" || el.tagName === "HEADER" || el.tagName === "MAIN" || el.tagName === "FOOTER");
};

export const createButton = (component) => {
    const el = component.getEl();

    const btn = document.createElement("button");
    btn.innerText = "+ Add Section";

    Object.assign(btn.style, {
        position: "absolute",
        bottom: "-11px",
        left: "0",
        padding: "4px 12px",
        borderRadius: "20px",
        background: "#0f3460",
        color: "#fff",
        fontSize: '10px',
        border: "none",
        cursor: "pointer",
        zIndex: 10,
    });

    // Ensure parent is relative
    const computed = window.getComputedStyle(el);
    if (computed.position === "static") {
        el.style.position = "relative";
    }

    el.appendChild(btn);

    return btn;
};

export const removeButton = (currentBtnRef) => {
    if (currentBtnRef.current) {
        currentBtnRef.current.remove();
        currentBtnRef.current = null;
    }
};

export const addComponentToCanvas = (component, html) => {
    if (!component) return;

    const parent = component.parent();
    const currentIndex = component.index();

    parent.append(html, {
        at: currentIndex + 1,
    });
};