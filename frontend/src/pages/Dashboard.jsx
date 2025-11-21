import React, { useEffect, useState } from "react";
import API from "../services/api";
import NoteForm from "../components/NoteForm";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/notes" + (q ? `?q=${q}` : ""));
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (note) => {
    await API.post("/notes", note);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="container mt-4">
      <h3>Your Notes</h3>

      {/* Search */}
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={fetchNotes}>
          Search
        </button>
      </div>

      {/* Add note */}
      <div className="card p-3 mb-4">
        <h5>Add New Note</h5>
        <NoteForm onSubmit={createNote} />
      </div>

      {/* Notes List */}
      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4" key={note._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5>{note.title}</h5>
                <p>{note.body}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}
