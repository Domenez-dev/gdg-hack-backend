const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Environment Variables
require("dotenv").config();

// Database
const db = require("./models");

// Routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Initialize Express App
const app = express();

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Database Connection & Synchronization
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synchronized");
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err);
  });

// Catch 404 and Forward to Error Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
