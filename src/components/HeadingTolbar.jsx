const TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const HeadingToolbar = ({ isOpen, currentTag, onChange }) => {
    if (!isOpen) return null;

    return (
        <div className="style-row">
            <label className="style-label">Heading</label>

            <div className="heading-toolbar">
                {TAGS.map((tag) => (
                    <button
                        key={tag}
                        className={`heading-tag-btn ${currentTag === tag ? 'active' : ''}`}
                        onClick={() => onChange(tag)}
                    >
                        {tag.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HeadingToolbar;