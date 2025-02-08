const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "your_db_name",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "postgres",
  },
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
