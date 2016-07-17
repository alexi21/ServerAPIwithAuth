const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
// Look at the request header for the jwt
const jwtoptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
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