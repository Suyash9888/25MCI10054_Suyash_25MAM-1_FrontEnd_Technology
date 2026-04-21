import React, { useRef } from "react";

function NoteForm({ addNote }) {
  const inputRef = useRef();

  const handleAdd = () => {
    addNote(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="note-form">
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your note here..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>Add Note</button>
    </div>
  );
}

export default NoteForm;