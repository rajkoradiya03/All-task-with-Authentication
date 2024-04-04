const connection = require("../../config/database");
const logger = require('../../common/logger');

exports.form = async (req,res)=>{
    try {
        let Gender = await this.gender();
        let Relationship = await this.relationship();
        let SCourse = await this.scourse();
        let CCourse = await this.ccourse();
        let Languages = await this.languages();
        let Technology = await this.technologies();
        let PreferedCity = await this.preferedCity();
        res.render('AJAX_Job_Application/Job_Application_Form', {
            data: {},
            Gender: Gender,
            Relationship: Relationship,
            SCourse: SCourse,
            CCourse: CCourse,
            Languages: Languages,
            Technology: Technology,
            PreferedCity: PreferedCity,
        });
    } catch (error) {
        logger.error("Ajax exresice Form function: " + error.message);
    }
}

exports.gender = async ()=>{
    try {
        let Gendersql = `select o.id, s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Gender"`;
    
        let [Genderres] = await connection.query(Gendersql);
    
        let Gender = `<td><label for="${Genderres[0]["select_key"]}">${Genderres[0]["select_key"]}:</label></td>`;
        Gender += `<td class="flex">`;
        for (let i = 0; i < Genderres.length; i++) {
          Gender += `<input type="radio" name="${Genderres[i]["select_key"]}" id="${Genderres[i]["option_key"]}"value="${Genderres[i]["option_value"]}" /><label for="${Genderres[i]["option_key"]}">${Genderres[i]["option_value"]}</label>`;
        }
        Gender += `<p class="msg"></p></td>`;
    
        return Gender;
    } catch (error) {
        logger.error("Ajax Exersice gender function: "+ error.message)
    }
}

exports.relationship = async ()=>{
    try {
        let relationsql = `select o.id, s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Relationship"`;
    
        let [relationres] = await connection.query(relationsql);
    
        let relationship = `<td><label for="${relationres[0]["select_key"]}">${relationres[0]["select_key"]} Status:</label></td><td class="flex"><select name="${relationres[0]["select_key"]}" id="${relationres[0]["select_key"]}" ${relationres[0]["multiselect"]} ><option value="">Select status</option>`;
        for (let i = 0; i < relationres.length; i++) {
            relationship += `<option value="${relationres[i]["option_value"]}">${relationres[i]["option_value"]}</option>`;
        }
        relationship += `</select><p class="msg"></p></td>`;

        return relationship;
    } catch (error) {
        logger.error("Ajax Exersice relationship function: "+ error.message)
    }
}

exports.scourse = async ()=>{
    try {
        let scoursesql = `select o.id, s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "SchoolCourse";`
        
        let [scourseres] = await connection.query(scoursesql);
    
        let scourse = `<td><label for="Course">Course Name:</label></td><td><select name="Course" id="${scourseres[0]["select_key"]}" ${scourseres[0]["multiselect"]} ><option value="">Select course</option>`;
        for (let i = 0; i < scourseres.length; i++) {
            scourse += `<option value="${scourseres[i]["option_value"]}">${scourseres[i]["option_value"]}</option>`;
        }
        scourse += `</select><p class="msg"></p></td>`;
    
        return scourse;
    } catch (error) {
        logger.error("Ajax Exersice scource function: "+ error.message)
    }
}


exports.ccourse = async ()=>{
    try {
        let ccoursesql = `select o.id, s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "CollegeCourse";`   
        
        let [ccourseres] = await connection.query(ccoursesql);
    
        let ccourse = `<td><label for="Course">Course Name:</label></td><td><select name="Course" id="${ccourseres[0]["select_key"]}" ${ccourseres[0]["multiselect"]} ><option value="">Select course</option>`;
        for (let i = 0; i < ccourseres.length; i++) {
            ccourse += `<option value="${ccourseres[i]["option_value"]}">${ccourseres[i]["option_value"]}</option>`;
        }
        ccourse += `</select><p class="msg"></p></td>`;
    
        return ccourse;
    } catch (error) {
        logger.error("Ajax Exersice ccourse function: "+ error.message)
    }
}

exports.languages = async ()=>{
    try {
        let languagesql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Languages"`;
    
        let [languageres] = await connection.query(languagesql);
    
        let language = `<tr><td><label for="${languageres[0]["select_key"]}">${languageres[0]["select_key"]}:</label></td></tr>`;
        for (let i = 0; i < languageres.length; i++) {
            language += `<tr><input type="hidden" name="lid" id="id${i}" value=""><td><input type="checkbox" name="${languageres[i]["select_key"]}${i}" id="${languageres[i]["option_key"]}" value="${languageres[i]["option_value"]}">
            <label for="${languageres[i]["option_key"]}">${languageres[i]["option_value"]}</label></td>
            <td>
                <input
                type="checkbox"
                name="lnglevel${i}"
                id="lnglevel${i}1"
                value="Read"
                />
                <label for="lnglevel${i}1">Read</label>
            </td>
            <td>
                <input
                type="checkbox"
                name="lnglevel${i}"
                id="lnglevel${i}2"
                value="Write"
                />
                <label for="lnglevel${i}2">Write</label>
            </td>
            <td>
                <input
                type="checkbox"
                name="lnglevel${i}"
                id="lnglevel${i}3"
                value="Speak"
                />
                <label for="lnglevel${i}3">Speak</label>
            </td></tr>`;
        }
    
        return language;
    } catch (error) {
        logger.error("Ajax Exersice languages function: "+ error.message)
    }
}

exports.technologies = async ()=> {
    try {
        let technologysql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Technologies"`;
    
        let techlevelsql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Level"`;
    
        let [technologyres] = await connection.query(technologysql);
        let [techlevelres] = await connection.query(techlevelsql);
    
        let technology = `<tr><td><label for="${technologyres[0]["select_key"]}">${technologyres[0]["select_key"]}:</label></td></tr>`;
          for (let i = 0; i < technologyres.length; i++) {
            technology += `<tr><input type="hidden" name="tid" id="id${i}" value=""><td><input type="checkbox" name="${technologyres[i]["select_key"]}${i}" id="${technologyres[i]["option_key"]}" value="${technologyres[i]["option_value"]}">
            <label for="${technologyres[i]["option_key"]}">${technologyres[i]["option_value"]}</label></td>`;
    
            for(let j = 0; j < techlevelres.length; j++){
                technology += `
                <td>
                    <input type="radio" name="level${i}" id="level${i}${j}" value="${techlevelres[j]['option_value']}"/>
                    <label for="level${i}${j}">${techlevelres[j]['option_value']}</label>
                </td>`
            }
    
            technology += `</tr>`
        }
    
        return technology;
    } catch (error) {
        logger.error("Ajax Exersice technology function: "+ error.message)
    }
}

exports.preferedCity = async () => {
    try {
        let preferedcitysql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "PreferedLocation"`;
    
        let [preferedcityres] = await connection.query(preferedcitysql);
    
        let preferedcity = `<td><label for="${preferedcityres[0]["select_key"]}">${preferedcityres[0]["select_key"]} :</label></td><td class="flex"><select name="${preferedcityres[0]["select_key"]}" id="${preferedcityres[0]["select_key"]}" ${preferedcityres[0]["multiselect"]} >`;
        for (let i = 0; i < preferedcityres.length; i++) {
            preferedcity += `<option value="${preferedcityres[i]["option_value"]}" name="pcity">${preferedcityres[i]["option_value"]}</option>`;
        }
        preferedcity += `</select><p class="msg"></p></td>`;
    
        return preferedcity;
    } catch (error) {
        logger.error("Ajax Exersice preferedcity function: "+ error.message)
    }
}