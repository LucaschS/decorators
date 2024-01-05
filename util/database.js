const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "ikPLls5658", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
