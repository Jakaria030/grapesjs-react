import { BLOCKS } from '../../constants/blocks';

const BlocksPanel = ({ editorRef }) => {
    const handleDragStart = (e, block) => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.BlockManager.startDrag(editor.BlockManager.get(block.id));
    };

    const handleDragEnd = () => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.BlockManager.endDrag();
    };

    return (
        <div className="blocks-grid">
            {BLOCKS.map((block) => (
                <div
                    key={block.id}
                    className="block-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                    onDragEnd={handleDragEnd}
                >
                    <span
                        className="block-icon"
                        dangerouslySetInnerHTML={{ __html: block.media }}
                    />
                    <span className="block-label">{block.label}</span>
                </div>
            ))}
        </div>
    );
};

export default BlocksPanel;
