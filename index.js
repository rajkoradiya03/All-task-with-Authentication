const express  = require('express');
const router = require('./routes/router');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
require('dotenv').config();
const logger = require("./common/logger2");

app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/public', express.static('public'))
app.set('view engine', 'ejs')
app.set('/views', 'views')
app.use('/', router)
app.use(passport.initialize()); 
let port = process.env.PORT
app.listen(port, ()=>{
    logger.info('Server Running on port ' + port)
})