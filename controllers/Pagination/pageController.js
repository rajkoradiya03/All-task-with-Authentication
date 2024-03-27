const connection = require('../../config/database');
require('dotenv').config();
 
exports.pagination = async (req,res)=>{
    const pageCount = 1;
 
    const datacount = "select count(*) as count from studentmaster;"

    let [result] = await connection.query(datacount);   
    let totalpage = result[0].count / process.env.TOTAL_DATA;
    let page;
    if(Number(req.query.page) > totalpage || req.query.page === undefined){
        page = 1;
    }
    else{
        page = Number(req.query.page);
    }
    // console.log(page);
    let orderby = req.query.orderby;
    let order = req.query.order;
    // console.log(order);  

    let sql = "";
    if(orderby === undefined && order === undefined){
        sql = "select s_rollno as \"RollNo\",s_fname as \"FirstName\",s_lname as \"LastName\",s_phone_number as \"PhoneNo\",s_father_number as \"FatherNumber\",s_address as \"Address\",s_city as \"City\",s_standard as \"Standard\",DATE_FORMAT(s_birthday, \"%Y %M %D\") as \"BirthDate\",DATE_FORMAT(s_joiningdate, \"%Y %M %D\") as \"JoiningDate\",s_adharno as \"AdharCardNo\" from studentmaster  limit ?,200" 
    }  
    else if(order === undefined){
        sql = "select s_rollno as \"RollNo\",s_fname as \"FirstName\",s_lname as \"LastName\",s_phone_number as \"PhoneNo\",s_father_number as \"FatherNumber\",s_address as \"Address\",s_city as \"City\",s_standard as \"Standard\",DATE_FORMAT(s_birthday, \"%Y %M %D\") as \"BirthDate\",DATE_FORMAT(s_joiningdate, \"%Y %M %D\") as \"JoiningDate\",s_adharno as \"AdharCardNo\" from studentmaster order by "+orderby+" asc limit ?,200"
    }  
    else{  
        sql = "select s_rollno as \"RollNo\",s_fname as \"FirstName\",s_lname as \"LastName\",s_phone_number as \"PhoneNo\",s_father_number as \"FatherNumber\",s_address \"Address\",s_city as \"City\",s_standard as \"Standard\", DATE_FORMAT(s_birthday, \"%Y %M %D\") as \"BirthDate\",DATE_FORMAT(s_joiningdate, \"%Y %M %D\") as \"JoiningDate\",s_adharno as \"AdharCardNo\" from studentmaster order by "+orderby+ " " +order+" limit ?,200" 
    }
    // console.log(order);
    let src;
    if(order === undefined){
        src = ""
    }
    else if(order === "asc"){
        src = "/public/css/Pagination/image/up-arrow.svg"
    }
    else{
        src = "/public/css/Pagination/image/down-arrow.svg"
    }
    
    let offset = page - 1 >= 0 ? page - 1 : 0; 
 
    // console.log(process.env.TOTAL_DATA);  
    let startingpoint = offset * process.env.TOTAL_DATA; 

    [result] = await connection.query(sql, [startingpoint])
    // console.log(result[0]);
    res.render('Pagination/pagination', {data:result, totalpage:totalpage, page:page, orderby:orderby, order:order, imgsrc: src})
}
