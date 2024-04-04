const connection = require("../../config/database");
const md5 = require("md5");
const jwt = require('jsonwebtoken')

exports.authLogin = async (req,res) =>{
  try {
      let data = req.body;
  
      let Usersql = `select * from Users where UserName = "${data.username}";`
  
      let [result] = await connection.query(Usersql);
  
      let msg = "";
  
      if(data.username == "" || data.password == "") {
          msg = "All field are required!!"
          res.json({
              errmessage: msg
          })
      } else if(result.length == 0){
          msg = "User not Register!!"
          res.json({
              errmessage: msg
          })
      } else if(result[0].isVerified == 0){
          let dataDeleteSQL = `delete from Users where UserName = ?;`
  
          let [deleteRES] = await connection.query(dataDeleteSQL, [data.username]);
          
          msg = "User is not verified!!"

          res.json({
              errmessage : msg
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
              return res.cookie("token", token, {maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true}).json({message: msg, token:token})
          }
      }
  } catch (error) {
      console.log("login: "+ error.message);
      res.status(500).json({ errmessage: "Server Error!!"})
  }
}