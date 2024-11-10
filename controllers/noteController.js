const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validasi kolom kosong
    if (!title || !description) {
      return res.status(400).json({ message: 'Title dan description harus diisi' });
    }

    const note = await Note.create({ title, description, userId: req.userId });

    res.status(201).json({ message: 'Catatan berhasil dibuat', note });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ where: { userId: req.userId } });

    if (!notes.length) {
      return res.status(204).json({ message: 'Tidak ada catatan ditemukan' });
    }

    res.status(200).json({ notes });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};

exports.getNoteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    }

    res.status(200).json({ note });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};

exports.editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    }

    note.title = title || note.title;
    note.description = description || note.description;
    await note.save();

    res.status(200).json({ message: 'Catatan berhasil diperbarui', note });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ where: { id, userId: req.userId } });

    if (!note) {
      return res.status(404).json({ error: 'Catatan tidak ditemukan' });
    }

    await note.destroy();

    res.status(200).json({ message: 'Catatan berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};