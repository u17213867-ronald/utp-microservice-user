'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'university_code', {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: 'University code starting with "U" followed by numbers'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'university_code');
  }
};
