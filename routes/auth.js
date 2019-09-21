const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route GET /api/auth
// @des     get logged in user
// @acc     private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-pass');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route POST /api/auth
// desc  login user and get token
// acc   public

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('pass', 'password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, pass } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: `User doesn't exists` });

      const isMatch = await bcrypt.compare(pass, user.pass);

      if (!isMatch) return res.json({ msg: 'Wrong Password' });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('secret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
