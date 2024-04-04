const connection = require("../../config/database");
const logger = require('../../common/logger');


exports.ajaxupdateForm = async (req,res)=>{
    try {
        let id = req.params.id
    
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