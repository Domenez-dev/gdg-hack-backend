const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = 3000;

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(process.env.DISCORD_TOKEN);

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2 strategy
passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/discord/callback',
  scope: ['identify', 'guilds', 'guilds.members.read'],
}, (accessToken, refreshToken, profile, done) => {
  // Save user profile and tokens
  return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send(`Welcome, ${req.user.username}!`);
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//get ALL roles te3 el user

app.get('/user/:userId/allRoles', async (req, res) => {
    const { userId } = req.params;
    const guild = client.guilds.cache.get(GUILD_ID);
    const member = await guild.members.fetch(userId);
  
    if (!member) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    const roles = member.roles.cache.map(role => ({
      id: role.id,
      name: role.name,
    }));
  
    res.json({ roles });
  });


//ajouter role 
app.post('/user/:userId/roles', async (req, res) => {
    const { userId } = req.params;
    const { roleId } = req.body;
  
    const guild = client.guilds.cache.get(GUILD_ID);
    const member = await guild.members.fetch(userId);
    const role = guild.roles.cache.get(roleId);
  
    if (!member || !role) {
      return res.status(404).json({ error: 'User or role not found' });
    }
  
    await member.roles.add(role);
    res.json({ message: 'Role added successfully' });
  });



//create channels te3 role 
app.post('/roles', async (req, res) => {
    const { roleName, categoryName, channelNames } = req.body;
  
    const guild = client.guilds.cache.get(GUILD_ID);
  
    // Create role
    const role = await guild.roles.create({
      name: roleName,
      permissions: [PermissionsBitField.Flags.ViewChannel],
    });
  
    // Create category
    const category = await guild.channels.create({
      name: categoryName,
      type: 4, // Category type
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: role.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });
  
    // Create channels in the category
    const channels = [];
    for (const channelName of channelNames) {
      const channel = await guild.channels.create({
        name: channelName,
        type: 0, // Text channel type
        parent: category.id,
      });
      channels.push(channel.name);
    }
  
    res.json({ role, category, channels });
  });


//middleware te3 roles 

const allowedRoles = ["Co-Manager", "HR", "Human Resources", "DEV", "Development", "COM", "Communication", "VIS", "visuals", "LOG", "Logistics", "RLX", "External Relations"];

const checkRole = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  guild.members.fetch(req.user.id).then((member) => {
    const hasAccess = member.roles.cache.some(role => role.name === 'Co-Manager' || role.name === 'HR');
    if (hasAccess) {
      next();
    } else {
      res.status(403).send('You do not have permission to access this page.');
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred while fetching user roles.');
  });
};

// Example route for users with a specific role
app.get('/admin', checkRole, (req, res) => {
  res.send('Welcome, admin!');
});

// Get roles of the user
app.get('/user/:userId/roles', async (req, res) => {
  const { userId } = req.params;
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const member = await guild.members.fetch(userId);

  if (!member) {
    return res.status(404).json({ error: 'User not found' });
  }

  const roles = member.roles.cache
    .filter(role => allowedRoles.includes(role.name))
    .map(role => ({
      id: role.id,
      name: role.name,
    }));

  res.json({ roles });
});

