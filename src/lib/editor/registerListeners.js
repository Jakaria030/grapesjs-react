
export const registerListeners = (editor) => {
    editor.on('component:selected', (component) => {
        const el = component.getEl();

        const isVideo =
            el?.tagName === 'VIDEO' ||
            el?.tagName === 'SOURCE' ||
            el?.closest?.('video') ||
            component.get('type') === 'video';

        if (isVideo) {
            let videoComponent = component;
            if (el?.tagName === 'SOURCE') {
                videoComponent = component.parent();
            }

            editor.AssetManager.open({
                types: ['video'],
                accept: 'video/*',
                select(asset, complete) {
                    const selected = editor.getSelected();
                    if (selected && selected.is('video')) {
                        selected.addAttributes({ src: asset.getSrc() });
                        complete && editor.AssetManager.close();
                    }
                },
            });
        }
    });
};
