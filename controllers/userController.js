const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi kolom kosong
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    // Email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Pengguna berhasil dibuat', user });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi kolom kosong
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Cek password dan kirim pesan error spesifik jika salah
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server', details: err.message });
  }
};
