import React from "react";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  deleteNote,
  startEdit,
  updateNote,
  editId,
  editText,
  setEditText,
}) {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <div className="empty-box">
          <p>No notes added yet.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="note-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((note, index) => (
                <NoteItem
                  key={note.id}
                  index={index}
                  note={note}
                  deleteNote={deleteNote}
                  startEdit={startEdit}
                  updateNote={updateNote}
                  editId={editId}
                  editText={editText}
                  setEditText={setEditText}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NoteList;