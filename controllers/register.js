const User = require('../models/User');

exports.register = function (email, password, name) {
  const user = new User({
    email: email,
    password: password,
    profile: {
      name: name
    }
  });

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return ({error:err});
    }
    if (existingUser) {
      return ({error: 'Account with that email address already exists.'});
    }
    user.save((err) => {
      if (err) {
        return ({error:err});
      }
      User.findOne({ email: email }, (err, user) => {
        return user;
      });
    });
  });
};