const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();


try {
    var cookieExtractor = function(req) {
        var token = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        return token;
    };
    
    let opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
    }

    passport.use(
        new JwtStrategy(opts, (payload, done)=>{
            return done(null, payload);
        })
    )
} catch (error) {
    console.log("passport: "+ error.message);
}

module.exports = passport;