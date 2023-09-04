const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function validatePassword(plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = { hashPassword, validatePassword };
