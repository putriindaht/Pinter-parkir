"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkingRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingRecord.belongsTo(models.Vehicle);
      ParkingRecord.belongsTo(models.Location);
    }
  }
  ParkingRecord.init(
    {
      inTime: { type: DataTypes.DATE },
      outTime: { type: DataTypes.DATE },
      VehicleId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      LocationId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "ParkingRecord",
    },
  );
  return ParkingRecord;
};
