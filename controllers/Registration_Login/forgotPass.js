const connection = require("../../config/database");
const generateString = require('../../common/generateString');
const logger = require("../../common/logger");

exports.forgotPass = async (req,res)=>{
  try {
      let email = req.body.email;

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
      logger.error("Registration Login exercise Forgot password function: "+error.message);
      res.status(500).json({message: "Server Error!!"})
  }
}