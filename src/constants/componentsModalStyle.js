export const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: "80%",
        height: "80%",
        background: "#fff",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    header: {
        padding: "10px 15px",
        borderBottom: "1px solid #0f3460",
        display: "flex",
        justifyContent: "space-between"
    },
    body: {
        display: "flex",
        flex: 1,
    },
    sidebar: {
        width: "200px",
        borderRight: "1px solid #0f3460",
        padding: "10px"
    },
    tab: {
        padding: "10px",
        cursor: "pointer"
    },
    content: {
        padding: "10px",
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
        gap: "10px",
        height: "700px",
        alignContent: "start",
        justifyContent: "start",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ddd",
        padding: "10px",
        cursor: "pointer",
        background: "#fafafa"
    }
};