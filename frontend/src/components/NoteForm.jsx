import React, { useState } from "react";

export default function NoteForm({ onSubmit }) {
  const [form, setForm] = useState({ title: "", body: "" });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ title: "", body: "" });
      }}
    >
      <input
        name="title"
        className="form-control mb-2"
        placeholder="Note Title"
        value={form.title}
        onChange={handle}
        required
      />
      <textarea
        name="body"
        className="form-control mb-2"
        placeholder="Note Description"
        rows={3}
        value={form.body}
        onChange={handle}
      />
      <button className="btn btn-success w-100">Add Note</button>
    </form>
  );
}
