const passport = require('passport');
const User = require('../models/User');
let express = require('express');
let router = express.Router();
let register = require('../controllers/register');

router.route('/login')
    .post(function (req, res, next) {
      req.assert('email', 'Email is not valid').isEmail();
      req.assert('password', 'Password cannot be blank').notEmpty();
      req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

      const errors = req.validationErrors();
      if (errors) {
        res.status(400).send(errors);
      } else {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            res.send(400, info);
          }
          res.status(200).send(user);
        })(req, res, next);
      }
    });

router.route('/register')
  .post(function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).send(errors);
    } else {
      res.status(200).send(register.register(req.body.email, req.body.password, req.body.name));
    }
  });


module.exports = router;
