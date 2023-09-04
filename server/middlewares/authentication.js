const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid token" };
    }
    const payload = verifyToken(access_token);
    if (!payload) {
      throw { name: "Invalid token" };
    }
    const user = User.findOne({ where: { email: payload.email } });
    if (!user) {
      throw { name: "Invalid token" };
    }
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
