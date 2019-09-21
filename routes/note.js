const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Note = require('../models/Note');
const User = require('../models/User');

// route Get /api/note
// desc  get all user notes
// acc   private

router.get('/', auth, async (req, res) => {
  try {
    let notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// route Post /api/note
// desc  Add note to db
// acc   private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('body', 'Cotent of note is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, body } = req.body;

    try {
      const newNote = new Note({
        user: req.user.id,
        title,
        body,
        data: new Date().toLocaleString()
      });

      const note = await newNote.save();

      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// route Post /api/note
// desc  edit note
// acc   private

router.put('/:id', auth, async (req, res) => {
  const { title, body } = req.body;

  const editNote = {};

  if (title) editNote.title = title;
  if (body) editNote.body = body;

  if (editNote !== {}) editNote.data = new Date().toLocaleString();

  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: editNote
      },
      {
        new: true
      }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @ route      DELETE /api/note:id
// @ des        Delete note
// @ acc        Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: 'Note not found' });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
