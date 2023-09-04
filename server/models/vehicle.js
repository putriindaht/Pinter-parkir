"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User);
      Vehicle.belongsToMany(models.Location, { through: "ParkingRecords" });
    }
  }
  Vehicle.init(
    {
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "License number is required",
          },
          notNull: {
            msg: "License number is required",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Brand is required",
          },
          notNull: {
            msg: "Brand is required",
          },
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Color is required",
          },
          notNull: {
            msg: "Color is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Vehicle's nickname is required",
          },
          notNull: {
            msg: "Vehicle's nickname is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
    },
  );
  return Vehicle;
};
