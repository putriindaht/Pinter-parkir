const { Location } = require("../models");
class locationController {
  static async getLocation(req, res, next) {
    try {
      const locations = await Location.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(locations);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = locationController;
