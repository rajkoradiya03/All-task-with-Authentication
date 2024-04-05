const connection = require("../../config/database");
const logger = require('../../common/logger');


exports.ajaxupdateForm = async (req,res)=>{
    try {
        let id = req.params.id
    
        let BDsql = `select * from candidatemaster where id = ? ;`
        let EDsql = `select * from education_details where cid = ? ;`
        let WDsql = `select * from work_experience_details where cid = ? ;`
        let KLsql = `select * from know_languages where cid = ? ;`
        let Tsql = `select * from technologies where cid = ? ;`
        let PDsql = `select * from preference_details where cid = ? ;`
        let RDsql = `select * from reference_details where cid = ? ;`
    
        let [BDres] = await connection.query(BDsql, [id]);
        let [EDres] = await connection.query(EDsql, [id]);
        let [WDres] = await connection.query(WDsql, [id]);
        let [KLres] = await connection.query(KLsql, [id]);
        let [Tres] = await connection.query(Tsql, [id]);
        let [PDres] = await connection.query(PDsql, [id]);
        let [RDres] = await connection.query(RDsql, [id]);
    
        res.json({
            BD: BDres,
            ED:EDres,
            WD:WDres,
            KL: KLres,
            Tech: Tres,
            PD: PDres,
            RD: RDres
        })
    } catch (error) {
        logger.error("Ajax Exersice updateForm function: "+ error.message)
    }
}