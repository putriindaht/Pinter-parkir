"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ParkingRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      inTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      outTime: {
        type: Sequelize.DATE,
      },
      isParking: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      VehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vehicles",
          key: "id",
        },
      },
      LocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Locations",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ParkingRecords");
  },
};
