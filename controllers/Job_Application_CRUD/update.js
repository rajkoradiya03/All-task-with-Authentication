const connection = require("../../config/database");
const { getCombos } = require("./generateController");

exports.updateForm = async (req,res)=>{
    try {
        let id = req.query.sid;
        // console.log(id);
    
        let Combos = await getCombos();
    
        let BDsql = `select * from candidatemaster where id = ${id};`
        let EDsql = `select * from education_details where cid = ${id};`
        let WDsql = `select * from work_experience_details where cid = ${id};`
        let KLsql = `select * from know_languages where cid = ${id};`
        let Tsql = `select * from technologies where cid = ${id};`
        let PDsql = `select * from preference_details where cid = ${id};`
        let RDsql = `select * from reference_details where cid = ${id};`
    
        let [BDres] = await connection.query(BDsql);
        let [EDres] = await connection.query(EDsql);
        let [WDres] = await connection.query(WDsql);
        let [KLres] = await connection.query(KLsql);
        let [Tres] = await connection.query(Tsql);
        let [PDres] = await connection.query(PDsql);
        let [RDres] = await connection.query(RDsql);
    
        let dataArr = [
            BDres[0].id,
            BDres[0].c_fname,
            BDres[0].c_lname,
            BDres[0].c_designation,
            BDres[0].c_email,
            BDres[0].c_phoneNo,
            BDres[0].c_address,
            BDres[0].c_city,
            BDres[0].c_state,
            BDres[0].c_zipcode,
            BDres[0].c_gender,
            BDres[0].c_relationship,
            BDres[0].c_dob.toISOString().slice(0,10),
        ]
    
        let EDArr = [];
        for(let i = 0; i < EDres.length; i++){
            EDArr.push(EDres[i]['name_of_school_or_university'])
            EDArr.push(EDres[i]['course_name'])
            EDArr.push(EDres[i]['passing_year'])
            EDArr.push(EDres[i]['persentage'])
            EDArr.push(EDres[i]['id']);
        }
    
       
    
        let WDArr = [];
        for(let i = 0; i < WDres.length; i++){
            WDArr.push(WDres[i]['company_name'])
            WDArr.push(WDres[i]['current_designation'])
            WDArr.push(WDres[i]['joining_date'].toISOString().slice(0,10))
            WDArr.push(WDres[i]['leaving_date'].toISOString().slice(0,10))
            WDArr.push(WDres[i]['id'])
        }
    
        let lngmode = [];
    
        for(let i = 0; i < KLres.length ; i++){
            lngmode.push(KLres[i]['languages_mode'].split(','))
        }
    
        let techlevel = [];
    
        for(let i = 0; i < Tres.length; i++){
            techlevel.push(Tres[i]['tech_level']);
        }
    
        let RDArr = [];
    
        for(let i = 0 ; i < RDres.length; i++){
            RDArr.push(RDres[i]['reference_name'])
            RDArr.push(RDres[i]['reference_phoneNo'])
            RDArr.push(RDres[i]['relation'])
            RDArr.push(RDres[i]['id'])
        }
    
        let PDArr = [];
    
        for(let  i = 0; i< PDres.length; i++){
            PDArr.push(PDres[i]['prefered_location'])
            PDArr.push(PDres[i]['department'])
            PDArr.push(PDres[i]['expacted_CTC'])
            PDArr.push(PDres[i]['notice_period'])
            PDArr.push(PDres[i]['current_CTC'])
        }
    
        let pid = [];
        for(let  i = 0; i< PDres.length; i++){
            pid.push(PDres[i]['id']);
        }
    
        pid = pid.join(',')
        PDArr.unshift(pid);
    
        let gender = Combos.Gender(dataArr[10])
        let relation = Combos.Relationship(dataArr[11])
        let scourse = Combos.SCourse()
        let ccourse = Combos.CCourse()
        let language = Combos.Languages(KLres, lngmode)
        let technology = Combos.Technologies(Tres,techlevel)
        let prefered = Combos.prefered(PDres);
    
        // console.log(dataArr);
    
        res.render("Job_Application_CRUD/jobApplicationForm", {
            Gender : gender,
            relationship: relation,
            language: language,
            technology: technology,
            preferedcity: prefered,
            scourse:scourse,
            ccourse:ccourse,
            data: dataArr,
            eddata: EDArr,
            wddata:WDArr,
            rddata:RDArr,
            pddata: PDArr,
        });
    } catch (error) {
        console.log("Update: " + error.message);
    }
}