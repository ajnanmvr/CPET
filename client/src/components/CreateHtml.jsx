import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { useEffect } from "react";

function CreateHtml({  setHtml }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);
  return (
    <div className="min-h-[160px]">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        placeholder="Enter your content here"
      />
    </div>
  );
}

export default CreateHtml;
