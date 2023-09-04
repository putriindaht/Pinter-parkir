const { Subscription } = require("../models");
class subsController {
  static async getListSubs(req, res, next) {
    try {
      const listSubs = await Subscription.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(listSubs);
    } catch (err) {
      next(err);
    }
  }

  static async addSubs(req, res, next) {
    try {
      const { name, description, price, durationAmount, durationUnit } =
        req.body;
      const newSub = await Subscription.create({
        name,
        description,
        price,
        durationAmount,
        durationUnit,
      });
      res.status(201).json(newSub);
    } catch (err) {
      next(err);
    }
  }

  static async deleteSubs(req, res, next) {
    try {
      const { id } = req.params;
      const sub = await Subscription.findByPk(id);
      console.log(sub);
      if (!sub) {
        throw { name: "Subscription not found" };
      }
      await Subscription.destroy({ where: { id } });
      res.status(200).json({
        message: `Subscription with id ${sub.id} successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = subsController;
