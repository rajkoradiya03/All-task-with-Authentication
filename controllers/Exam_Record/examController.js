const connection = require('../../config/database');

require('dotenv').config();
exports.page = (req,res)=>{
    res.render('examTable');
}

exports.examRecord = async (req,res)=>{
    try {
        const datacount = 200;
        let totalpage = Math.floor(datacount / process.env.TOTAL_EDATA);
        let page;
        if(Number(req.query.page) > totalpage || req.query.page === undefined){
            page = 1;
        }
        else{
            page = Number(req.query.page);
        }
    
        let examQuery = `select studentmaster.id, studentmaster.s_fname, 
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
            group by studentmaster.id limit ?,20;`
        
        
        let offset = page - 1 >= 0 ? page - 1 : 0; 
        let startingpoint = offset * process.env.TOTAL_EDATA;
        let [result] = await connection.query(examQuery, [startingpoint])
        // console.log(result);
        res.render('Exam_Record/examTable', {data:result, totalpage:totalpage, page:page})
    } catch (error) {
        console.log("Exam record examRecord function:" + error.message);
    }
}  


exports.reportCard = async (req,res)=>{
    try {
        let id = Number(req.query.id)
    
        let namequery = `select s_fname from studentmaster where id = ${id}`
    
        let stdreportQuery = `select subjectmaster.subject_name,
        sum(case when exammaster.exam_name = "Prilim" then exam_record.obt_pra_mark else 0 end) as primil_pra,
        sum(case when exammaster.exam_name = "Prilim" then exam_record.obt_thry_mark else 0 end) as primil_thry,
        sum(case when exammaster.exam_name = "Terminal" then exam_record.obt_pra_mark else 0 end) as terminal_pra,
        sum(case when exammaster.exam_name = "Terminal" then exam_record.obt_thry_mark else 0 end) as terminal_thry,
        sum(case when exammaster.exam_name = "Final" then exam_record.obt_pra_mark else 0 end) as final_pra,
        sum(case when exammaster.exam_name = "Final" then exam_record.obt_thry_mark else 0 end) as final_thry
        from exam_record left join exammaster on exammaster.e_id = exam_record.e_id
        left join subjectmaster on exam_record.sub_id = subjectmaster.subject_id where exam_record.s_id = ${id} group by subjectmaster.subject_name;` 
    
        let markquery = `select (sum(obt_pra_mark) + sum(obt_thry_mark)) as "Total Marks", ((sum(obt_pra_mark) + sum(obt_thry_mark)) * 100) / 1200 as Percentage from exam_record where s_id = ${id};`
    
        let attendencequery = `select date_format(attendence_record.attendence_date, "%M") as "Month", 
        count(attendence_record.Present)
        from attendence_record 
        where Present = 1 and s_id = ${id} group by Month;`
    
        let attenperquery = `select  
        (count(attendence_record.Present) * 100) / 91 as "AttendencePer"
        from attendence_record 
        where Present = 1 and s_id = ${id};`
        let [result] = await connection.query(stdreportQuery);
        let [namerlt] = await connection.query(namequery); 
        let [attenrlt] = await connection.query(attendencequery); 
        let [totalmarkrlt] = await connection.query(markquery);
        let [attenperrlt] = await connection.query(attenperquery);
        res.render('Exam_Record/ReportCard', {data:result, name:namerlt, attendata:attenrlt, totalmark:totalmarkrlt, attenper:attenperrlt})
    } catch (error) {
        console.log("Exam record reportcard function: "+error.message);
    }
} 