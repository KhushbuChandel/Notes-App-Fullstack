const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
      user: req.user
    });

    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const q = req.query.q;
    let notes;

    if (q) {
      notes = await Note.find({
        user: req.user,
        title: { $regex: q, $options: "i" }
      });
    } else {
      notes = await Note.find({ user: req.user });
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
