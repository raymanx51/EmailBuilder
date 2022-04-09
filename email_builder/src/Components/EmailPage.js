import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';
// const fs = require('fs');

const Emailer = (props) => {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);

      let file = new Blob([html], {type: "text/html"});
      let url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = url.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    // var htmlContent = '<html>Whatever</html>';
    // fs.writeFile('/my-page.html', htmlContent, (error) => { /* handle error */ });
  };

  const exportDesign = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', design);

      let file = new Blob([JSON.stringify(design)], {type: "application/json"});
      let url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = url.split('/').pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = props.saveFile;
    emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  const reload = () => {
    window.location.reload();
  }

  return (
    <div>
      <div>
        <br/>
        <button onClick={reload}>Reset</button>
        <br/>
        <br/>
      </div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={exportDesign}>Save Design</button>
        <br/>
      </div>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
};

export default Emailer;