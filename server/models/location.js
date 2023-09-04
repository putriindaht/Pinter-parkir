"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.belongsToMany(models.Vehicle, { through: "ParkingRecords" });
    }
  }
  Location.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      coordinate: { type: DataTypes.GEOMETRY("POINT", 4326), allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Location",
    },
  );
  return Location;
};
