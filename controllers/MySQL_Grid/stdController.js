const connection = require("../../config/database");

exports.dataTable = (req,res)=>{
    res.render('MySQL_Grid/dataTable');
}

exports.dataRetrive = async (req,res)=>{
    try {
        var dataQuery = "select s_rollno as \"Roll No\",s_fname ,s_lname,s_phone_number,s_father_number,s_address,s_city,s_standard,s_birthday,s_joiningdate,s_adharno from studentmaster limit 100";
        let [result] = await connection.query(dataQuery)
        res.render('MySQL_Grid/dataTable', {data: result})
    } catch (error) {
        console.log("Error While Fetch Data: "+ error.message);
    }
}   