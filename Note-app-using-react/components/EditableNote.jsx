import React, { useState } from 'react';
import "./EditableNote.css";

function EditableNote({ note, onDelete, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.text);
  const title = note.title;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const downloadNote = () => {
    const text = content;
    const link = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
      <div id='Note'>
        <div id='heading'>
          {title}
          <img
            id='delbtn'
            src="./assets/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
            alt='del'
            onClick={() => onDelete(id)}
            title='delete note'
          />
        </div>
        <div id='note-box'>
          {isEditing ? (
            <div id='first'>
              <div id='editing-text-area'>
                <textarea
                  id='editing-text-area'
                  value={content}
                  onChange={handleChange}
                />
              </div>
              <button id='savebtn' onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div id='second'>
              <p id='text-area'>{content}</p>
              <div id='inner'>
                <button id='editbtn' onClick={handleEdit}>Edit</button>
                <button id='downbtn' onClick={downloadNote}>Download</button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default EditableNote;
