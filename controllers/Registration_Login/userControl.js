const md5 = require("md5");
const connection = require("../../config/database");
require('dotenv').config();
const jwt = require('jsonwebtoken')
const generateString = require("../../common/generateString")

exports.getRegisterData = async (req,res)=>{
    try { 
        let data = req.body; 

        let preData = "select * from Users";
        let [preRes] = await connection.query(preData);

        preRes.forEach((name) => {
            if(name.UserName == data.username){
                res.json({errMessage: "Invalid User Name!!"})
            }
        })

        if(data.firstName == "" && data.password == "" && data.confirmpassword == "" && data.lastName == "" && data.email == "" && data.username == ""){
            res.json({errMessage: "Enter Valid Information!!"})
        }
        else if(data.password !== data.confirmpassword ){
            res.json({errMessage: "Both password are not match!!"})    
        } else {
            let charSet = process.env.CHARSET;
            let verificationCode = generateString(12, charSet)
            let salt = generateString(4, charSet); 
            let dataSQL = `insert into Users (user_fname,user_lname,user_email,UserName,user_password,password_salt,verification_code) values (?,?,?,?,?,?,?)`
            let password = data.password + salt;
            password = md5(password);
            const [result] = await connection.query(dataSQL, [data.firstName, data.lastName, data.email, data.username, password, salt, verificationCode]); 
    
            res.json({message: "Click Here", code: verificationCode, email:data.email})
        }
    } catch (error) {
        console.log("Register form function: "+error.message);
        res.status(500).json({errMessage:"Server Error!!"})
    }
}

exports.logout = (req,res)=>{
    return res.clearCookie('token').json({success: "success", message: "Successfully logout..."})
}