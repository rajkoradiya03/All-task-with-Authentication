const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();


let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}
passport.use(
    new JwtStrategy(opts, (payload, done)=>{
        if(payload.username == data.username){
           return done(null, {payload, token});
        } else {
           return done(null, false);
        }
    })
)

module.exports = passport;