const connection = require("../../config/database");

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
          let charSet = process.env.CHARSET;
          let salt = generateString(4, charSet); 
          let password = pass+salt;
          password = md5(password);

          let updateSQL = `update Users set user_password = "${password}", password_salt = "${salt}" where user_email = "${email}";`;

          let [updaeRES] = await connection.query(updateSQL);

          return res.json({
              success: "Password Change successfully"
          })
      }
  } catch (error) {
      console.log("Register Form useController function: "+error.message);
  }
}