const connection = require("../config/database");
const logger = require("./logger");

exports.selectQueryCommon = async function(tableName) {
  let selectQuery = "select o.id, s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = ? ";

  let [result] = await connection.query(selectQuery, [tableName]);

  return result;
}