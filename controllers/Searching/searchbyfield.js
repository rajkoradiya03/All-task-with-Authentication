const logger = require('../../common/logger');
const connection = require('../../config/database');

require('dotenv').config();

exports.fieldData = async (req,res)=>{
    try {
        let fname = req.query.fname;
        let lname = req.query.lname;
        let city = req.query.city;
        let operator = req.query.op;
        let countQuery = "select count(*) as count from studentmaster;"
        let [dataCount] = await connection.query(countQuery);
        let totalPage = Math.floor(dataCount[0].count / process.env.TOTAL_EDATA);
        let page;
        if(req.query.page === undefined || Number(req.query.page) > totalPage){
            page = 1;
        }else{ 
            page = Number(req.query.page);
        }
        if(!(fname === "" || lname === "" || city === "" || operator === "")){ 
            let sqlQuery = `select * from studentmaster where s_fname = "${fname}" ${operator} s_lname = "${lname}" ${operator} s_city = "${city}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})
        }
        else if(!(fname === "" || lname !== "" || city !== "")){
            let sqlQuery = `select * from studentmaster where s_fname = "${fname}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})  
        }
        else if(!(lname === "" || fname !== "" || city !== "")){
            let sqlQuery = `select * from studentmaster where s_lname = "${lname}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})  
        }
        else if(!(city === "" || lname !== "" || fname !== "")){
            let sqlQuery = `select * from studentmaster where s_city = "${city}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})  
        }
        else if(!(fname === "" || lname === "" || city !== "")){
            let sqlQuery = `select * from studentmaster where s_fname = "${fname}" ${operator} s_lname = "${lname}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})
        }
        else if(!(fname === "" || lname !== "" || city === "")){
            let sqlQuery = `select * from studentmaster where s_fname = "${fname}" ${operator} s_city = "${city}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})
        }
        else if(!(fname !== "" || lname === "" || city === "")){
            let sqlQuery = `select * from studentmaster where s_lname = "${lname}" ${operator} s_city = "${city}" limit ?,20;`
        
            let offset = page - 1 >= 0 ? page - 1 : 0;  
            let startingpoint = offset * process.env.TOTAL_EDATA;
            let [result] = await connection.query(sqlQuery, [startingpoint]) 
            res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})
        }
        else{
            res.send("Enter Filter To get Data....") 
        }
    } catch (e) {
        logger.error("Error While get Data in searching exercise fieldData function: " +e.message);
    }
}