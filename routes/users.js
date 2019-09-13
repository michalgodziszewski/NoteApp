const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// route POST /api/users
// desc  register user and get token
// acc   public
router.post(
  '/',
  [
    check('name', 'Username is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('pass', 'Password must have at least 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, pass } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) res.status(400).json({ msg: 'User already exist' });

      const avatar = gravatar.url(email, {
        s: 200,
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        pass,
        avatar
      });

      // bcrypt

      const salt = await bcrypt.genSalt(10);

      user.pass = await bcrypt.hash(pass, salt);

      await user.save();

      //token

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('secret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;

          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
