const connection = require("../../config/database");
const logger = require('../../common/logger');
exports.DelimetersearchData = (req, res) => {
  res.render("Delimeter_Search/searchData");
};

exports.getData = async (req, res) => {
  try {
    let str = req.body.search;
    let fname = [];
    let lname = [];
    let phoneNo = [];
    let city = [];
    let std = [];
    for (let i = 0; i < str.length; i++) {
      let j = 0;
      if (str[i] === "_") {
        let substr = "";
        j = i + 1;
        while (
          str[j] !== "_" &&
          str[j] !== "^" &&
          str[j] !== "{" &&
          str[j] !== ":" &&
          str[j] !== "$" &&
          str[j] !== "%" &&
          j < str.length
        ) {
          substr += str[j];
          j++;
        }
        fname.push(substr);
        continue;
      }
      if (str[i] === "^") {
        let substr = "";
        j = i + 1;
        while (
          str[j] !== "_" &&
          str[j] !== "^" &&
          str[j] !== "{" &&
          str[j] !== ":" &&
          str[j] !== "$" &&
          str[j] !== "%" &&
          j < str.length
        ) {
          substr += str[j];
          j++;
        }
        lname.push(substr);
      }
      if (str[i] === "{") {
        let substr = "";
        j = i + 1;
        while (
          str[j] !== "_" &&
          str[j] !== "^" &&
          str[j] !== "{" &&
          str[j] !== ":" &&
          str[j] !== "$" &&
          str[j] !== "%" &&
          j < str.length
        ) {
          substr += str[j];
          j++;
        }
        phoneNo.push(substr);
      }
      if (str[i] === ":") {
        let substr = "";
        j = i + 1;
        while (
          str[j] !== "_" &&
          str[j] !== "^" &&
          str[j] !== "{" &&
          str[j] !== ":" &&
          str[j] !== "$" &&
          str[j] !== "%" &&
          j < str.length
        ) {
          substr += str[j];
          j++;
        }
        city.push(substr);
      }
      if (str[i] === "$") {
        let substr = "";
        j = i + 1;
        while (
          str[j] !== "_" &&
          str[j] !== "^" &&
          str[j] !== "{" &&
          str[j] !== ":" &&
          str[j] !== "$" &&
          str[j] !== "%" &&
          j < str.length
        ) {
          substr += str[j];
          j++;
        }
        std.push(substr);
      }
    }
    let query;
  
    fname = fname.filter((d) => d !== "");
    lname = lname.filter((d) => d !== "");
    phoneNo = phoneNo.filter((d) => d !== "");
    city = city.filter((d) => d !== "");
    std = std.filter((d) => d !== "");
  
    query = `select * from studentmaster where `;
    if (fname.length) {
      query += "(";
      for (let i = 0; i < fname.length; i++) {
        if (i + 1 < fname.length && !fname.includes("")) {
          query += `s_fname like "%${fname[i]}%" or `;
        } else {
          query += `s_fname like "%${fname[i]}%") and `;
        }
      }
    }
    if (lname.length) {
      query += "(";
      for (let i = 0; i < lname.length; i++) {
        if (i + 1 < lname.length && !lname.includes("")) {
          query += `s_lname like "%${lname[i]}%" or `;
        } else {
          query += `s_lname like "%${lname[i]}%") and `;
        }
      }
    }
    if (phoneNo.length) {
      query += "(";
      for (let i = 0; i < phoneNo.length; i++) {
        if (i + 1 < phoneNo.length && !phoneNo.includes("")) {
          query += `s_phone_number like "%${phoneNo[i]}%" or `;
        } else {
          query += `s_phone_number like "%${phoneNo[i]}%") and `;
        }
      }
    }
    if (city.length) {
      query += "(";
      for (let i = 0; i < city.length; i++) {
        if (i + 1 < city.length && !city.includes("")) {
          query += `s_city like "%${city[i]}%" or `;
        } else {
          query += `s_city like "%${city[i]}%") and `;
        }
      }
    }
    if (std.length) {
      query += "(";
      for (let i = 0; i < std.length; i++) {
        if (i + 1 < std.length && !std.includes("")) {
          query += `s_standard like "%${std[i]}%" or `;
        } else {
          query += `s_standard like "%${std[i]}%") and `;
        }
      }
    }
    query += `true limit 100`;
    let [result] = await connection.query(query);
  
    res.render("Delimeter_Search/showData", { data: result, str: str });
  } catch (error) {
    logger.error("Delimeter Search Exersice dataController function: "+ error.message)
  }
};
