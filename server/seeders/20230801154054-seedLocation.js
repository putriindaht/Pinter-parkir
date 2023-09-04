"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = require("../data/location.json");

    for (const location of locations) {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      await queryInterface.sequelize.query(
        `
        INSERT INTO "Locations" ("name", "coordinate", "address", "createdAt", "updatedAt")
        VALUES
        ('${location.name}', ST_GeomFromText('POINT(${location.longitude} ${location.latitude})'), '${location.address}', '${formattedDate}', '${formattedDate}');
      `,
        {
          type: Sequelize.QueryTypes.INSERT,
        },
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Locations", null, {});
  },
};
