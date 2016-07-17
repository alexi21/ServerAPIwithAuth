const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy for SIGNIN
// Set local signin username as email to override default
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  // Verify this email and password
  // Call done with the user if it is correct
  // Otherwise call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err, false); }
    if (!user) { return done(null, false); } // User not found

    // Compare passwords for user if they exist to supplied password
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
// Look at the request header for the jwt
const jwtoptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy for AUTH REQUEST
const jwtLogin = new JwtStrategy(jwtoptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does call 'done' with that user => done(err, user)
  // Otherwise call 'done' without a user object

  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); } // On error

    if (user) {
      done(null, user); // Found a user
    } else {
      done(null, false); // Did not find a user
    }

  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);