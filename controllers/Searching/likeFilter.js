require('dotenv').config()

exports.likeData = async (req,res)=>{
    try {
        let fname = req.query.fname;
        // console.log(fname);
        let lname = req.query.lname;
        let city = req.query.city;
        let operator = req.query.op;
        let dataCount = 1000;
        let totalPage = dataCount / process.env.TOTAL_EDATA;
        let page;
        if(req.query.page === undefined || Number(req.query.page) > totalPage){
            page = 1;
        }else{ 
            page = Number(req.query.page);
        }
        let sqlQuery = `select * from studentmaster where s_fname like '${fname}%' limit ?,20`
        let offset = page - 1 >=0 ? page - 1 : 0;
        let startingpoint = offset * process.env.TOTALVALUE 
        let [result] = await connection.query(sqlQuery, [startingpoint])
        // console.log(result);
        res.render('Searching/filterData', {data:result, page:page, totalpage:totalPage, path:req.pathname, fname:fname, lname:lname, city:city, operator:operator})
    } catch (error) {
        console.log("Searching like data function: "+error.message);
    }
}