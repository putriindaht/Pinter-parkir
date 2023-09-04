"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const vehicles = require("../data/vehicle.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Vehicles", vehicles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vehicle", null);
  },
};
