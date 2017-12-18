
const Boom = require('boom');
const User = require('../model/User');

function verifyUniqueUser(req, res) {
  // Find an entry from the database that
  // matches either the email or username
                const util = require('util')
                console.log(util.inspect(req, {
                            showHidden: false,
                            depth: null
                        }));
  User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    // Check whether the username or email
    // is already taken and error out if so
    if (user) {
      if (user.username === req.payload.username) {
        res(Boom.badRequest('Username taken'));
      }
      if (user.email === req.payload.email) {
        res(Boom.badRequest('Email taken'));
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    res(req.payload);
  });
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser
}