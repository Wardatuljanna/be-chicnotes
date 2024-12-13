const express = require('express');
const { createNote, getNotes, getNoteDetail, editNote, deleteNote } = require('../controllers/noteController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createNote);
router.get('/all', authenticate, getNotes);
router.get('/:id', authenticate, getNoteDetail); 
router.put('/:id', authenticate, editNote);       
router.delete('/:id', authenticate, deleteNote);

module.exports = router;
