const connection = require("../../config/database");

exports.getData2 = async (req, res) => {
  try {
    let str = req.body.search;
    // console.log(str);
    let strRep;
    for (let i = 0; i < str.length; i++) {
      strRep = str.replaceAll("_", " fname ");
      strRep = strRep.replaceAll("^", " lname ");
      strRep = strRep.replaceAll("{", " phoneNo ");
      strRep = strRep.replaceAll(":", " city ");
      strRep = strRep.replaceAll("$", " std ");
    }
    // console.log(strRep);
    let strArr = strRep.split(" ");
    // console.log(strArr);
  
    let strObj = {};
    let key;
    for (let i = 1; i < strArr.length; i++) {
      if (i % 2 !== 0) {
        key = strArr[i];
      } else {
        if (!strObj[key]) {
          strObj[key] = [];
        }
        strObj[key].push(strArr[i]);
      }
    }
    let query = `select * from studentmaster where `;
    for (let i in strObj) {
      if (i === "fname") {
        // console.log(strObj['fname'].length);
        query += "(";
        for (let j = 0; j < strObj["fname"].length; j++) {
          if (j + 1 < strObj["fname"].length) {
            query += `s_fname like "%${strObj["fname"][j]}%" or `;
          } else {
            query += `s_fname like "%${strObj["fname"][j]}%") and `;
          }
        }
      }
      if (i === "lname") {
        query += "(";
        for (let j = 0; j < strObj["lname"].length; j++) {
          if (j + 1 < strObj["lname"].length) {
            query += `s_lname like "%${strObj["lname"][j]}%" or `;
          } else {
            query += `s_lname like "%${strObj["lname"][j]}%") and `;
          }
        }
      }
      if (i === "phoneNo") {
        if (strObj["phoneNo"].length) {
          query += "(";
          for (let i = 0; i < strObj["phoneNo"].length; i++) {
            if (
              i + 1 < strObj["phoneNo"].length &&
              !strObj["phoneNo"].includes("")
            ) {
              query += `s_phone_number like "%${strObj["phoneNo"][i]}%" or `;
            } else {
              query += `s_phone_number like "%${strObj["phoneNo"][i]}%") and `;
            }
          }
        }
      }
      if (i === "city") {
        if (strObj["city"].length) {
          query += "(";
          for (let i = 0; i < strObj["city"].length; i++) {
            if (i + 1 < strObj["city"].length && !strObj["city"].includes("")) {
              query += `s_city like "%${strObj["city"][i]}%" or `;
            } else {
              query += `s_city like "%${strObj["city"][i]}%") and `;
            }
          }
        }
      }
      if (i === "std") {
        if (strObj["std"].length) {
          query += "(";
          for (let i = 0; i < strObj["std"].length; i++) {
            if (i + 1 < strObj["std"].length && !strObj["std"].includes("")) {
              query += `s_standard like "%${strObj["std"][i]}%" or `;
            } else {
              query += `s_standard like "%${strObj["std"][i]}%") and `;
            }
          }
        }
      }
    }
    query += `true limit 100`;
    // console.log(strObj);
  
    let [result] = await connection.query(query);
  
    // console.log(result);
  
    res.render("Delimeter_Search/showData", { data: result, str: str });
  } catch (error) {
    console.log("Delimeter datacontroller2 function: "+error.message);
  }
}
