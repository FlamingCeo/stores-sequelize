'use strict';
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
       Email: 'admin@gmail.com',
       password: await bcrypt.hash('12345678', 10)
     }], {});
  },

  async down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('users', null, {});

  }
};
