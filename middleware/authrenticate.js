const jwt = require('jsonwebtoken');
require('dotenv').config();
// const passport = require('passport');

exports.authrate = (req,res,next)=>{
    try {
        let token = req.cookies.token || req.body.token;
        
        if(!token){
            res.send("Token is not Found ")
        } else {
            let decodeData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodeData;
            req.token = token
        
            next();
        }
    } catch (error) {
        console.log("auth err: " + error.message);
    }
}