const logger = require("../../common/logger");
const connection = require("../../config/database");

exports.main = (req,res)=>{
    res.render('Generate_Combo/index')
}

exports.getValue = async (req,res)=>{
    try {
        let generateName = req.query.generator;
        let type = req.query.type;
        let selected = req.query.selected
        if(type === ""){
            res.send('Enter type..')
        }else{
            let sql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect from select_master s inner join option_master o on s.id = o.sid where s.select_key = "${generateName}"`
            let [result] = await connection.query(sql);
            if(!result.length){
                res.send("Not Found "+req.query.generator);
            }
            else{
                let select = "";
                let input = "";
                if(type === "radio" || type === "checkbox"){
                    input += `<label for="${result[0]['select_key']}">${result[0]["select_key"]}:</label>`
                                for( let i = 0; i < result.length; i++ ) { 
                                    input += `<input type="${type}" name="${result[i]['select_key']}" id="${result[i]['option_key']}" value="${result[i]['option_value']}" ${selected === result[i]['option_key'] ? "checked" : ""}>
                                    <label for="${result[i]['option_key']}">${result[i]['option_value']}</label>`
                                }
                }
                else{
                    select += `<label for="${result[0]['select_key']}">${result[0]['select_key']}:</label>
                                    <select name="${result[0]['select_key']}" id="${result[0]['select_key']}" ${result[0]['multiselect']} >
                                            <option value="">Select</option>`
                                    for( let i = 0; i < result.length; i++ ) { 
                                        select += `<option value="${result[i]['option_value']}">${result[i]['option_value']}</option>`
                                    }
                                    select += `</select>`
                }
                res.render('Generate_Combo/inputgenerate', {input:input,select:select,type:type, selected: selected === undefined ? null : selected})
            }

        }
    } catch (e) {
        logger.error("Generate combo Exersice getValue function: "+ error.message)
        res.json(`Generate combo data controller function ${req.query.generator} Not Found... ${e.message}`);
    }
}