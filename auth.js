const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: "1027485564712-is5vc262mu4o42111s0bba84osbv3uea.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback:true
  },
  function(req,accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})