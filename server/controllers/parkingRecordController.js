const isRecordExpired = require("../helpers/isRecordExpired");
const { ParkingRecord, Vehicle, Transaction, Location } = require("../models");
const { Op } = require("sequelize");
class ParkingRecordController {
  static async addRecord(req, res, next) {
    try {
      const { vehicleId } = req.body;
      const { id: userId } = req.user;
      const today = new Date();
      const transaction = await Transaction.findOne({
        where: {
          status: "paid",
          UserId: userId,
        },
      });
      if (!transaction || transaction.expiredDate < today) {
        throw { name: "Transaction not found" };
      }
      const newRecord = await ParkingRecord.create({
        VehicleId: vehicleId,
      });
      res.status(201).json({
        message: "Success Add Record",
      });
    } catch (err) {
      next(err);
    }
  }

  static async patchRecord(req, res, next) {
    try {
      const { vehicleId } = req.body;
      const { id: userId } = req.user;
      const record = await ParkingRecord.findOne({
        where: {
          VehicleId: vehicleId,
        },
      });
      if (!record) {
        throw { name: "Parking record not found" };
      }
      const updated = await ParkingRecord.update(
        {
          outTime: new Date(),
        },
        {
          where: {
            VehicleId: vehicleId,
          },
        },
      );
      res.status(200).json({
        message: "Success upadate record",
      });
    } catch (err) {
      next(err);
    }
  }

  static async tapIn(req, res, next) {
    try {
      const { vehicleId, locationId } = req.body;
      const record = await ParkingRecord.findOne({
        where: {
          VehicleId: vehicleId,
          inTime: {
            [Op.eq]: null,
          },
        },
      });

      if (!record) {
        throw { name: "Parking record not found" };
      }

      if (isRecordExpired(record.createdAt, 60)) {
        throw { name: "QR is expired" };
      }

      const updated = await ParkingRecord.update(
        {
          inTime: new Date(),
          LocationId: locationId,
        },
        {
          where: {
            id: record.id,
          },
        },
      );
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async tapOut(req, res, next) {
    try {
      const { vehicleId, locationId } = req.body;
      const record = await ParkingRecord.findOne({
        where: {
          VehicleId: vehicleId,
          LocationId: locationId,
          outTime: {
            [Op.eq]: null,
          },
        },
      });
      if (!record) {
        throw { name: "Parking record not found" };
      }
      const updated = await ParkingRecord.update(
        {
          outTime: new Date(),
        },
        {
          where: {
            id: record.id,
          },
        },
      );
      res.status(201).json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async getRecords(req, res, next) {
    try {
      const { id, role } = req.user;
      let userFilter = {};
      if (role === "customer") {
        userFilter = { UserId: id };
      }
      const option = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          inTime: {
            [Op.not]: null,
          },
          outTime: {
            [Op.not]: null,
          },
        },
        include: [
          {
            model: Vehicle,
            where: userFilter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Location,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      };
      const parkingRecords = await ParkingRecord.findAll(option);
      res.status(200).json(parkingRecords);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ParkingRecordController;
