const { Vehicle } = require("../models");
class vehicleController {
  static async addVehicle(req, res, next) {
    try {
      const { id } = req.user;
      const { nickname, licenseNumber, brand, color } = req.body;
      const newVehicle = await Vehicle.create({
        nickname,
        licenseNumber,
        brand,
        color,
        UserId: id,
      });
      res.status(201).json({
        id: newVehicle.id,
        licenseNumber: newVehicle.licenseNumber,
        UserId: newVehicle.UserId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getVehicle(req, res, next) {
    try {
      const { id, role } = req.user;
      const option = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      if (role === "customer") {
        option.where = {
          UserId: id,
        };
      }
      const vehicles = await Vehicle.findAll(option);
      res.status(200).json(vehicles);
    } catch (err) {
      next(err);
    }
  }

  static async deleteVehicle(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId, role } = req.user;
      const option = {
        where: {
          id,
        },
      };
      if (role === "customer") {
        option.where.UserId = userId;
      }
      const vehicle = await Vehicle.findByPk(id);
      if (!vehicle) {
        throw { name: "Vehicle not found" };
      }
      await Vehicle.destroy(option);
      res.status(200).json({
        message: `Vehicle with license number ${vehicle.licenseNumber} successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = vehicleController;
