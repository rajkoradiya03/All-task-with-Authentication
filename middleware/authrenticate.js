const jwt = require('jsonwebtoken');
const logger = require('../common/logger');
require('dotenv').config();
// const passport = require('passport');

exports.authrate = (req,res,next)=>{
    try {
        let token = req.cookies.token || req.body.token;
        
        if(!token){
            res.redirect('/')
        } else {
            let decodeData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodeData;
            req.token = token
        
            next();
        }
    } catch (error) {
        logger.error("middleware authrenticate function err: " + error.message);
    }
}