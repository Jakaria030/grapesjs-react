import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { useEffect } from 'react';
import ComponentsPlugin from './plugins/ComponentsPlugin';


const App = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      storageManager: false,
      panels: { defaults: [] },

      plugins: [ComponentsPlugin],
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section",
            label: "<b>Section</b>",
            category: "Blocks",
            attributes: { class: "fa fa-cube" },

            content: `<section>
              <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`
          },
          {
            id: "text",
            label: "<b>Text</b>",
            category: "Blocks",
            attributes: { class: "fa fa-font" },

            content: `<h1>This is just a Lorem text: Lorem ipsum dolor sit amet</h1>`
          },

        ]
      },
      
    });


    editor.Panels.addPanel({
      id: 'top-panel',
      buttons: [
        {
          id: "visibility",
          active: true,
          className: "btn-toggle-borders",
          label: "<u>B<u>",
          command: "sw-visibility"
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "EXP",
          command: "export-template"
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON").setContent(`<textarea style="width: 100%; height: 250px;">${JSON.stringify(editor.getComponents())}</textarea>`).open();
          }
        }
      ]
    })

    return () => editor.destroy();
  }, []);

  return (
    <>
      <div className="top-panel"></div>
      <div id="gjs"></div>
      <div id="blocks"></div>
      <div className="layers-container"></div>
    </>
  );
};

export default App;