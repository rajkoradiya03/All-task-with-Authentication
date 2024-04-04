const logger = require("../../common/logger");
const connection = require("../../config/database");

exports.rePassword = async (req,res)=>{
  try {
      let code = req.query.code;

      let verifySQL = `select Created_AT from Users where verification_code = "${code}";`
  
      let [verifyRES] = await connection.query(verifySQL);
  
      let diff = Number(new Date(Date.now()) - new Date(verifyRES[0]["Created_AT"]));
      let minute = Math.floor((diff / 1000) / 60);

      if(minute >= 3){
          let dataDeleteSQL = `delete from Users where verification_code = "${code}";`
  
          let [deleteRES] = await connection.query(dataDeleteSQL);

          let message = "Your verification code is expire. Please register again."
          let btn = "Registration"
          let href = "/register"
          res.render('Registration_Login/Verification', {message:message, btn:btn, href:href});
      } else {
          let updateSQL = `update Users set isVerified = 1 where verification_code = "${code}";`
  
          let[result] = await connection.query(updateSQL);

          res.render('Registration_Login/reEnterPass')
      }
  } catch (error) {
      logger.error("Registration Login exercise Re type password function: "+error.message);
      res.status(500).render('Registration_Login/Verification', {message:"Server Error!!", btn:"Go Back", href:'/'})
  }
}
