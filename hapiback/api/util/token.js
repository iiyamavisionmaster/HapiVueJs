
const jwt = require('jsonwebtoken');
var config = require('config');

function createToken(user) {
  let scopes; console.log('test3');
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign({ id: user._id, username: user.username, scope: scopes }, config.get('key'), { algorithm: 'HS256', expiresIn: "1h" } );
}

module.exports = createToken;