"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsToMany(models.Vehicle, { through: "Transactions" });
    }
  }
  Subscription.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      durationAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Duration amount is required",
          },
          notNull: {
            msg: "Duration amount is required",
          },
        },
      },
      durationUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Duration unit is required",
          },
          notNull: {
            msg: "Duration unit is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          notNull: {
            msg: "Price is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    },
  );
  return Subscription;
};
