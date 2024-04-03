const connection = require("../../config/database");

exports.getCombos = async (req, res) => {
  try {
    let Gendersql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Gender"`;

    let relationsql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Relationship"`;

    let languagesql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Languages"`;

    let technologysql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "Technologies"`;

    let preferedcitysql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "PreferedLocation"`;

    let scoursesql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "SchoolCourse";`

    let ccoursesql = `select s.select_key,s.control_type,o.option_key,o.option_value,s.multiselect,o.selectedvalue from select_master s inner join option_master o on s.id = o.sid where s.select_key = "CollegeCourse";`

    let etypesql = "select option_value from option_master where sid = 3;"

    let [Genderres] = await connection.query(Gendersql);
    let [relationres] = await connection.query(relationsql);
    let [languageres] = await connection.query(languagesql);
    let [technologyres] = await connection.query(technologysql);
    let [preferedcityres] = await connection.query(preferedcitysql);
    let [scourseres] = await connection.query(scoursesql);
    let [ccourseres] = await connection.query(ccoursesql);
    let [etyperes] = await connection.query(etypesql);

    function Gender(value){
      try {
        let Gender = `<td><label for="${Genderres[0]["select_key"]}">${Genderres[0]["select_key"]}:</label></td>`;
        Gender += `<td class="flex">`;
        for (let i = 0; i < Genderres.length; i++) {
          Gender += `<input type="radio" name="${Genderres[i]["select_key"]}" id="${Genderres[i]["option_key"]}" value="${Genderres[i]["option_value"]}"  ${Genderres[i]['option_value'] === value ? 'checked' : ""}/>
                        <label for="${Genderres[i]["option_key"]}">${Genderres[i]["option_value"]}</label>`;
        }
        Gender += `<p class="msg"></p></td>`;
  
        return Gender;
      } catch (error) {
        console.log("Gender function: " + error.message);
      }
    }

    function Relationship(value){
      try {
        let relationship = `<td><label for="${relationres[0]["select_key"]}">${relationres[0]["select_key"]} Status:</label></td><td class="flex"><select name="${relationres[0]["select_key"]}" id="${relationres[0]["select_key"]}" ${relationres[0]["multiselect"]} ><option value="">Select status</option>`;
        for (let i = 0; i < relationres.length; i++) {
          relationship += `<option value="${relationres[i]["option_value"]}" ${relationres[i]['option_value'] === value ? 'selected' : ""}>${relationres[i]["option_value"]}</option>`;
        }
        relationship += `</select><p class="msg"></p></td>`;
  
        return relationship
      } catch (error) {
        console.log("Relation Function: " + error.message);
      }
    }

    function Languages(lang,lngmode){
      try {
        let language = `<tr><td><label for="${languageres[0]["select_key"]}">${languageres[0]["select_key"]}:</label></td></tr>`;
        for (let i = 0; i < languageres.length; i++) {
          language += `<tr><input type="hidden" name="lid" id="id" value="${lang !== undefined && lang[i] !== undefined ? (lang[i]['id'] === 'undefined' ? "" : lang[i]['id']) : ""}"><td><input type="checkbox" name="${languageres[i]["select_key"]}${i}" id="${languageres[i]["option_key"]}" value="${languageres[i]["option_value"]}" ${lang !== undefined ? (lang.filter((d)=> d['Languages'] == languageres[i]['option_value']).length > 0 ? 'checked' : "") : ""}>
                <label for="${languageres[i]["option_key"]}">${languageres[i]["option_value"]}</label></td><td>
                <input
                  type="checkbox"
                  name="lnglevel${i}"
                  id="lnglevel${i}1"
                  value="Read"
                  ${lngmode !== undefined && lngmode[i] !== undefined ? ((lngmode[i][0] === "Read" || lngmode[i][0] === "Write" || lngmode[i][0] === "Speak") ? 'checked' : "") : ""}
                />
                <label for="lnglevel${i}1">Read</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  name="lnglevel${i}"
                  id="lnglevel${i}2"
                  value="Write"
                  ${lngmode !== undefined && lngmode[i] !== undefined ? ((lngmode[i][1] === "Read" || lngmode[i][1] === "Write" || lngmode[i][1] === "Speak") ? 'checked' : "") : ""}
                />
                <label for="lnglevel${i}2">Write</label>
              </td>
              <td>
                <input
                  type="checkbox"
                  name="lnglevel${i}"
                  id="lnglevel${i}3"
                  value="Speak"
                  ${lngmode !== undefined && lngmode[i] !== undefined ? ((lngmode[i][2] === "Read" || lngmode[i][2] === "Write" || lngmode[i][2] === "Speak") ? 'checked' : "") : ""}
                />
                <label for="lnglevel${i}3">Speak</label>
              </td></tr>`;
        }
  
        return language;
      } catch (error) {
        console.log("Language function: "+ error.message);
      }
    }

    function Technologies(tech){
      try {
        let technology = `<tr><td><label for="${technologyres[0]["select_key"]}">${technologyres[0]["select_key"]}:</label></td></tr>`;
        for (let i = 0; i < technologyres.length; i++) {
          technology += `<tr><td><input type="checkbox" name="${technologyres[i]["select_key"]}${i}" id="${technologyres[i]["option_key"]}" value="${technologyres[i]["option_value"]}" 
          ${tech !== undefined ? (tech.filter((d) => d['tech_name'] == technologyres[i]['option_value']).length > 0 ? 'checked' : "") : ""}>
                <label for="${technologyres[i]["option_key"]}">${technologyres[i]["option_value"]}</label></td>
                <td>
                    <input type="radio" name="level${i}" id="level${i}1" value="Beginer"
                    ${tech !== undefined ? (tech.filter((d) => d['tech_name'] == technologyres[i]['option_value'] && d['tech_level'] == "Beginer").length > 0 ? 'checked' : "") : ""}/>
                    <label for="level${i}1">Beginer</label>
                </td>
                <td>
                    <input type="radio" name="level${i}" id="level${i}2" value="Mideator"
                    ${tech !== undefined ? (tech.filter((d) => d['tech_name'] == technologyres[i]['option_value'] && d['tech_level'] == "Mideator").length > 0  ? 'checked' : "") : ""}/>
                    <label for="level${i}2">Mideator</label>
                </td>
                <td>
                    <input type="radio" name="level${i}" id="level${i}3" value="Expert"
                    ${tech !== undefined ? (tech.filter((d) => d['tech_name'] == technologyres[i]['option_value'] && d['tech_level'] == "Expert").length > 0  ? 'checked' : "") : ""}/>
                    <label for="level${i}3">Expert</label>
                </td>
                </tr>`;
        }
  
        return technology;
      } catch (error) {
        console.log("technology function: "+error.message);
      }
    }

    function prefered(PDcity){
      try {
        let preferedcity = `<td><label for="${preferedcityres[0]["select_key"]}">${preferedcityres[0]["select_key"]} :</label></td><td class="flex"><select name="${preferedcityres[0]["select_key"]}" id="${preferedcityres[0]["select_key"]}" ${preferedcityres[0]["multiselect"]} >`;
        for (let i = 0; i < preferedcityres.length; i++) {
          preferedcity += `<option value="${preferedcityres[i]["option_value"]}" ${PDcity !== undefined ? (PDcity.filter((d)=> d['prefered_location'] == preferedcityres[i]["option_value"]).length > 0 ? 'selected' : ""): ""}>${preferedcityres[i]["option_value"]}</option>`;
        }
        preferedcity += `</select><p class="msg"></p></td>`;
  
        return preferedcity;
      } catch (error) {
        console.log("preferedcity function: "+ error.message);
      }
    }

    function SCourse(){
      try {
        let scourse = `<td><label for="Course">Course Name:</label></td><td><select name="Course" id="${scourseres[0]["select_key"]}" ${scourseres[0]["multiselect"]} ><option value="">Select course</option>`;
        for (let i = 0; i < scourseres.length; i++) {
          scourse += `<option value="${scourseres[i]["option_value"]}">${scourseres[i]["option_value"]}</option>`;
        }
        scourse += `</select><p class="msg"></p></td>`;
  
        return scourse;
      } catch (error) {
        console.log("Scourse function: "+error.message);
      }
    }

    function CCourse(value){
      try {
        let ccourse = `<td><label for="Course">Course Name:</label></td><td><select name="Course" id="${ccourseres[0]["select_key"]}" ${ccourseres[0]["multiselect"]} ><option value="">Select course</option>`;
        for (let i = 0; i < ccourseres.length; i++) {
          ccourse += `<option value="${ccourseres[i]["option_value"]}" ${ccourseres[i]["option_value"] === value ? 'selected' : ""}>${ccourseres[i]["option_value"]}</option>`;
        }
        ccourse += `</select><p class="msg"></p></td>`;
  
        return ccourse;
      } catch (error) {
        console.log("Ccourse function: "+error.message);
      }
    }
    return {Gender,Relationship,Languages,Technologies,prefered,SCourse,CCourse};
  } catch (error) {
    console.log("Normal job application form Generate combo function: "+error.message);
  }
};
