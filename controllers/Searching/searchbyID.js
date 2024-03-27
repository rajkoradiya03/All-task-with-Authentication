const connection = require('../../config/database');

require('dotenv').config();

exports.searchData = (req,res)=>{
    res.render('Searching/searchData') 
}

exports.dataRetrive = async (req,res)=>{ 
    try {
        const dataCount = 200;
        let totalPage = Math.floor(dataCount / process.env.TOTAL_EDATA);
        let page = 1;
        if(req.query.page === undefined || Number(req.query.page) > totalPage){
            page = 1;
        }else{ 
            page = Number(req.query.page);
        }
        let id = (req.query.sid).split(',').map(Number).reverse();
        // console.log(id); 
        let examQuery;
        let result;
        examQuery = `select studentmaster.id, studentmaster.s_fname, 
                sum(case when exammaster.exam_name = "Prilim" then exam_record.obt_pra_mark else 0 end) as primil_pra,
                sum(case when exammaster.exam_name = "Prilim" then exam_record.obt_thry_mark else 0 end) as primil_thry,
                sum(case when exammaster.exam_name = "Terminal" then exam_record.obt_pra_mark else 0 end) as terminal_pra,
                sum(case when exammaster.exam_name = "Terminal" then exam_record.obt_thry_mark else 0 end) as terminal_thry,
                sum(case when exammaster.exam_name = "Final" then exam_record.obt_pra_mark else 0 end) as final_pra,
                sum(case when exammaster.exam_name = "Final" then exam_record.obt_thry_mark else 0 end) as final_thry,
                (sum(exam_record.obt_pra_mark) + sum(exam_record.obt_thry_mark)) as "Total Marks"
                from studentmaster
                inner join exam_record on studentmaster.id = exam_record.s_id
                inner join exammaster on exammaster.e_id = exam_record.e_id
                where studentmaster.id in (${id}) group by studentmaster.id limit ?,20;`
                let offset = page - 1 >= 0 ? page - 1 : 0;  
                let startingpoint = offset * process.env.TOTAL_EDATA;  
                [result] = await connection.query(examQuery, [startingpoint])
        res.render('Searching/showData', {data: result, totalpage:totalPage, page:page})
    
    } catch (e) { 
        console.log("Error While Get Data: "+e.message);
    }
} 