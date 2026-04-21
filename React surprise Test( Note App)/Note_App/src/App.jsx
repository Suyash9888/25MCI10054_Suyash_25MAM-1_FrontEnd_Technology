import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import './App.css';
function App() {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addNote = (text) => {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text: text,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const updateNote = (id) => {
    if (!editText.trim()) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: editText } : note
      )
    );

    setEditId(null);
    setEditText("");
  };

  return (
    <div className="app">
      <div className="container">
        <div className="top-bar">
          <h1>Notes App</h1>
          <p>Write, edit and manage your notes easily</p>
        </div>

        <NoteForm addNote={addNote} />

        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          startEdit={startEdit}
          updateNote={updateNote}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
        />
      </div>
    </div>
  );
}

export default App;