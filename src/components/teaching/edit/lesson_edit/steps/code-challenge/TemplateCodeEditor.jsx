import React from 'react';

import AceEditor from 'react-ace';

function TemplateCodeEditor() {
  return (
    <AceEditor
      mode={language}
      theme='tomorrow'
      name='code-editor'
      onChange={handleCodeChange}
      value={code}
      fontSize={14}
      width='100%'
      height={`${height}px`}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      ref={editorRef}
    />
  );
}

export default TemplateCodeEditor;
