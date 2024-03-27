const md5 = require("md5");
const connection = require("../config/database");
const generateString = require("./generateString");
require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.getRegisterData = async (req,res)=>{
    try { 
        let data = req.body; 
        // console.log(data);

        let preData = "select * from Users";
        let [preRes] = await connection.query(preData);

        preRes.forEach((name) => {
            // if(name.user_email == data.email){
            //     res.json({errMessage: "Email already exits!!"})
            // }
            if(name.UserName == data.username){
                res.json({errMessage: "Invalid User Name!!"})
            }
        })

  
        if(data.firstName == ""){
            res.json({errMessage: "Enter Valid Information!!"})
        }
        else if(data.password !== data.confirmpassword ){
            // console.log("Password doesn't match!!");
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
        console.log(error.message);
    }
}

// exports.thankyou = (req,res)=>{
//     let email = req.query.email;
//     let code = req.query.code;

//     res.render('ThankPage', {code: code, email:email})
// }


exports.getVerification = async (req,res)=>{
    try {
        let code = req.query.code;
        let verifySQL = `select Created_AT from Users where verification_code = "${code}";`
    
        let [result] = await connection.query(verifySQL);
    
        let diff = Number(new Date(Date.now()) - new Date(result[0]["Created_AT"]));
        let minute = Math.floor((diff / 1000) / 60);
        // console.log(minute);
    
        if(minute >= 3) {
            let dataDeleteSQL = `delete from Users where verification_code = "${code}";`
    
            let [deleteRES] = await connection.query(dataDeleteSQL);

            let message = "Your verification code is expire. Please register again."
            let btn = "Registration"
            let href = "/register"
            res.render('Verification', {message:message, btn:btn, href:href});
        } else {
            let updateCodeSQL = `update Users set isVerified = 1 where verification_code = "${code}";`
    
            let [updaeRES] = await connection.query(updateCodeSQL);
    
            let message = "Your email verification is complete."
            let btn = "Login"
            let href = "/login"
            res.render('Verification', {message:message, btn:btn, href:href});
        }
    } catch (error) {
        console.log(error.message);
    }
}


exports.authLogin = async (req,res) =>{
    try {
        let data = req.body
    
        let Usersql = `select * from Users where UserName = "${data.username}";`
    
        let [result] = await connection.query(Usersql);
    
        let msg = "";
    
        if(result.length <= 0) {
            msg = "User not Register!!"
            res.json({
                errmessage: msg
            })
        } else if(data.username == "" || data.password == ""){
            msg = "All field are required!!"
            res.json({
                errmessage: msg
            })
        } else {
            let password = data.password;
            let salt = result[0].password_salt;
    
            password = password + salt;
    
            password = md5(password)
    
            if(password !== result[0].user_password){
                msg = "Envalid username and password!!"
                res.json({
                    errmessage: msg
                })
            } else {
                // if(data.isRemember){}
                let payload = {
                    fname: result[0].user_fname,
                    lname: result[0].user_lname,
                    username: result[0].UserName,
                    email: result[0].user_email
                }
                let {user_password:_, ...userData} = result[0];
    
                let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
    
                userData.token = token;
    
                msg = "Login Successfully!"
                // req.headers.Authorization = "Bearer " + token;
                return res.cookie("token", token, {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true}).json({message: msg, token:token})
            }
        }
    } catch (error) {
        
    }

}

exports.logout = (req,res)=>{
    
    return res.clearCookie('token').json({success: "success", message: "Successfully logout..."})
}

exports.forgotPass = async (req,res)=>{
    try {
        let email = req.body.email;
        // console.log(email);

        let emailSQL = `select * from Users where user_email = "${email}";`;

        let [result] = await connection.query(emailSQL);

        if(result.length <= 0){
            return res.json({
                message: "Envalid Email ID!!",
            })
        } else {
            let charSet = process.env.CHARSET;
            let verificationCode = generateString(12, charSet);

            let updateCode = `update Users set verification_code = "${verificationCode}", isVerified = 0 where user_email = "${email}"`;

            let [updateRES] = await connection.query(updateCode);

            return res.json({code: verificationCode, email: email})
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.rePassword = async (req,res)=>{
    try {
        let email = req.query.email;
        let code = req.query.code;

        let verifySQL = `select Created_AT from Users where verification_code = "${code}";`
    
        let [verifyRES] = await connection.query(verifySQL);
    
        let diff = Number(new Date(Date.now()) - new Date(verifyRES[0]["Created_AT"]));
        let minute = Math.floor((diff / 1000) / 60);
        // console.log(minute);

        if(minute >= 3){
            let dataDeleteSQL = `delete from Users where verification_code = "${code}";`
    
            let [deleteRES] = await connection.query(dataDeleteSQL);

            let message = "Your verification code is expire. Please register again."
            let btn = "Registration"
            let href = "/register"
            res.render('Verification', {message:message, btn:btn, href:href});
        } else {
            let updateSQL = `update Users set isVerified = 1 where verification_code = "${code}";`
    
            let[result] = await connection.query(updateSQL);

            res.render('reEnterPass')
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.updatePass = async (req,res)=>{
    try {
        let pass = req.body.pass;
        let repass = req.body.repass;
        let email = req.body.email;
        if(pass !== repass){
            return res.json({
                message: "Both password dosen't match!!"
            })
        } else {
            // let passdata = `select * from Users where user_email = "${email}";`;

            let charSet = process.env.CHARSET;
            let salt = generateString(4, charSet); 
            let password = pass+salt;
            password = md5(password);

            // let [passRES] = await connection.query(passdata);

            let updateSQL = `update Users set user_password = "${password}", password_salt = "${salt}" where user_email = "${email}";`;

            let [updaeRES] = await connection.query(updateSQL);

            return res.json({
                success: "Password Change successfully"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
