import React, { useEffect, useRef, useState } from 'react';

import AceEditor from 'react-ace';

function TestCaseCodeEditor(props) {
  const { value, setValue } = props;
  const [height, setHeight] = useState(20);
  const editorRef = useRef(null);
  const maxLines = 10;

  const handleCodeChange = (newCode) => {
    setValue(newCode);
    const editor = editorRef.current.editor;
    const lineHeight = editor.renderer.lineHeight;
    const screenLength = editor.getSession().getScreenLength();
    const numberOfLines = Math.min(screenLength, maxLines);
    const newHeight = numberOfLines * lineHeight + editor.renderer.scrollBar.getWidth();
    setHeight(newHeight);
  };

  useEffect(() => {
    const editor = editorRef.current.editor;
    const lineHeight = editor.renderer.lineHeight;
    const screenLength = editor.getSession().getScreenLength();
    const numberOfLines = Math.min(screenLength, maxLines);
    const initialHeight =
      numberOfLines * lineHeight + editor.renderer.scrollBar.getWidth();
    setHeight(initialHeight);
  }, []);

  return (
    <AceEditor
      {...props}
      lineHeight={21}
      mode={'plain_text'}
      theme='tomorrow'
      onChange={handleCodeChange}
      value={value}
      fontSize={17}
      width='100%'
      height={`${height}px`}
      setOptions={{
        showLineNumbers: true,
        tabSize: 4,
      }}
      ref={editorRef}
    />
  );
}

export default TestCaseCodeEditor;
