const connection = require("../../config/database");

exports.showData = async (req,res)=>{
    let datasql = `select id as "Candidate ID", c_fname as "First Name", c_lname as "Last Name" from candidatemaster;`;

    let [result] = await connection.query(datasql);

    res.render('AJAX_Job_Application/EmployeeData', {
        data: result
    })
}