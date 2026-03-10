const Listener = (editor) => {
    editor.on('component:selected', (component) => {
        const el = component.getEl();

        console.log('selected tag:', el?.tagName); // debug — check what's being selected

        const isVideo =
            el?.tagName === 'VIDEO' ||
            el?.tagName === 'SOURCE' ||
            el?.closest?.('video') ||
            component.get('type') === 'video';

        if (isVideo) {
            // get the actual video component
            let videoComponent = component;
            if (el?.tagName === 'SOURCE') {
                videoComponent = component.parent(); // go up to <video>
            }

            editor.AssetManager.open({
                types: ['video'],
                accept: 'video/*',
                onSelect: (asset) => {
                    const url = asset.get('src');
                    const source = videoComponent.find('source')[0];

                    if (source) {
                        source.addAttributes({ src: url });
                    } else {
                        videoComponent.addAttributes({ src: url });
                    }

                    editor.AssetManager.close();
                    editor.refresh();
                },
            });
        }
    });
};

export default Listener;