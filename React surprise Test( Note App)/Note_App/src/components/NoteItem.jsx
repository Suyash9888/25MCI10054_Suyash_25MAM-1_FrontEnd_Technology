import React from "react";

function NoteItem({
  note,
  index,
  deleteNote,
  startEdit,
  updateNote,
  editId,
  editText,
  setEditText,
}) {
  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        {editId === note.id ? (
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className="note-text">{note.text}</span>
        )}
      </td>

      <td>
        <div className="action-buttons">
          {editId === note.id ? (
            <button className="save-btn" onClick={() => updateNote(note.id)}>
              Save
            </button>
          ) : (
            <>
              <button
                className="edit-btn"
                onClick={() => startEdit(note.id, note.text)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default NoteItem;