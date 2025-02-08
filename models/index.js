const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.DB_SSL === "true"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to the database"))
  .catch((err) => console.error("❌ Unable to connect to the database:", err));

// Export the sequelize instance
module.exports = sequelize;
