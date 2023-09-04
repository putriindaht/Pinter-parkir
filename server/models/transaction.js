"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Subscription);
    }
  }
  Transaction.init(
    {
      status: {
        type: DataTypes.ENUM("paid", "unpaid"),
        allowNull: false,
        defaultValue: "unpaid",
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiredDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      SubscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    },
  );
  return Transaction;
};
