const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { validatePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        role: "customer",
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Invalid email/password" };
      }
      const isValidPassword = validatePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Invalid email/password" };
      }
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async glogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          id: payload.id,
          email: payload.email,
          username: payload.email.split("@")[0],
          password: "google-login",
          role: "customer",
        },
        hooks: false,
      });

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const newUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      res.status(200).json({
        statusCode: 200,
        message: token,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = userController;
