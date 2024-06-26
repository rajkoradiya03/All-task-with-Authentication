const logger = require("../../common/logger");
const { getCombos } = require("./generateController");


exports.mainForm = async (req,res)=>{
    try {
        let Combos = await getCombos();

        let gender = Combos.Gender();
        let relation = Combos.Relationship();
        let scourse = Combos.SCourse();
        let ccourse = Combos.CCourse()
        let language = Combos.Languages()
        let technology = Combos.Technologies()
        let preferedcity = Combos.prefered(); 
    
        res.render("Job_Application_CRUD/jobApplicationForm", {
            Gender: gender,
            relationship: relation,
            language: language,
            technology: technology,
            preferedcity: preferedcity,
            scourse: scourse,
            ccourse: ccourse,
            data: [],
            eddata:[],
            wddata:[],
            rddata:[],
            pddata:[],
        });
    } catch (error) {
        logger.error("Normal job application form mainform function: "+error.message);
    }
}