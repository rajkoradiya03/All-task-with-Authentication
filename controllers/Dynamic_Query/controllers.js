const express = require("express");
const connection = require("../../config/database");
require('dotenv').config();

exports.query = (req,res)=>{
    res.render('Dynamic_Query/query')
}
  
exports.page = async (req,res)=>{
    try {
        let datacount = "select count(*) as count from studentmaster";
        let [resultcount] = await connection.query(datacount);
    
        let totalpage = resultcount[0].count / process.env.TOTALDATA
    
        let page;
        if(Number(req.body.page) > totalpage || req.body.page === undefined){
            page = 1;
        }
        else{
            page = Number(req.body.page);
        }
        let sqlquery = req.body.query + " limit ?,10";
        let offset = page - 1 >= 0 ? page - 1 : 0;
        let startingpoint = offset * process.env.TOTALDATA;
        let [result] = await connection.query(sqlquery,[startingpoint])
        res.render('Dynamic_Query/dynamic', {data:result, page:page, totalpage:totalpage, path:req.pathname});
    } catch (error) {
        console.log("Dynamic Query controller function: "+error.message);
        res.send('Table not Found!!')
    }
}    