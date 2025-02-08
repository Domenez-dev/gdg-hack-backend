const express = require("express");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2 strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL:
        process.env.DISCORD_REDIRECT_URI ||
        "http://localhost:3000/auth/discord/callback",
      scope: ["identify", "guilds", "guilds.members.read"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile); // Save user profile and tokens
    },
  ),
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const badgesRouter = require("./routes/badges");
const contributionsRouter = require("./routes/contributions");
const eventsRouter = require("./routes/events");
const feedbackRouter = require("./routes/feedback");
const fetchSheetDataRouter = require("./routes/fetchsheetdata");
const membersRouter = require("./routes/members");
const sendEmailRouter = require("./routes/sendemail");
const discordRolesRouter = require("./routes/discordroles");

// Register routes
app.use("/", indexRouter); // Root route
app.use("/api/users", usersRouter); // Users API
app.use("/api/badges", badgesRouter); // Badges API
app.use("/api/contributions", contributionsRouter); // Contributions API
app.use("/api/events", eventsRouter); // Events API
app.use("/api/feedback", feedbackRouter); // Feedback API
app.use("/api/fetch-sheet-data", fetchSheetDataRouter); // Google Sheets API
app.use("/api/members", membersRouter); // Members API
app.use("/api/send-email", sendEmailRouter); // Send Email API
app.use("/api/discord-roles", discordRolesRouter); // Discord Roles API
//
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("Error");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
