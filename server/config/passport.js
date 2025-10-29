const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/UserModel');

// --- Serialize and Deserialize User ---
// This is how Passport saves a user to the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Save only the user's MongoDB _id
});

// This is how Passport retrieves a user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- Google Strategy ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback', // Must match your .env and Google Console
    proxy: true // Trust the proxy in our production environment
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find a user with this Google ID
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });

      if (user) {
        // User already exists
        return done(null, user);
      } else {
        // Create a new user
        user = new User({
          providerId: profile.id,
          provider: 'google',
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null
        });
        await user.save();
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- GitHub Strategy ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'github' });

      if (user) {
        return done(null, user);
      } else {
        user = new User({
          providerId: profile.id,
          provider: 'github',
          displayName: profile.displayName || profile.username,
          email: profile.emails ? profile.emails[0].value : null
        });
        await user.save();
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- Facebook Strategy ---
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails'], // Fields to request
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });

      if (user) {
        return done(null, user);
      } else {
        user = new User({
          providerId: profile.id,
          provider: 'facebook',
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null
        });
        await user.save();
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));