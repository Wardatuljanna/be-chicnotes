const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate empty fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const note = await Note.create({ title, description, userId: req.userId });

    res.status(201).json({ message: 'Note created successfully', note });
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred', details: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ where: { userId: req.userId } });

    if (!notes.length) {
      return res.status(204).json({ message: 'No notes found' });
    }

    res.status(200).json({ notes });
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred', details: err.message });
  }
};

exports.getNoteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred', details: err.message });
  }
};

exports.editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred', details: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.destroy();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error occurred', details: err.message });
  }
};
