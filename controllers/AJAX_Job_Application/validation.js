const connection = require("../../config/database");

exports.ajaxvalidation = async (req,res)=>{
    try {
        let data = req.body;

        let emailregx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        let pNoregx = /^(\d){10}$/;
        if (
        data.fname === "" ||
        data.lname === "" ||
        data.Cdesignation === "" ||
        data.email === "" ||
        data.pNo === "" ||
        data.addr === "" ||
        data.city === "" ||
        data.state === "" ||
        data.zipcode === "" ||
        data.Relationship === "" ||
        data.DOB === "" ||
        data.Course[0] === "" ||
        data.Year[0] === "" ||
        data.Percentage[0] === "" ||
        data.Course[1] === "" ||
        data.Year[1] === "" ||
        data.Percentage[1] === "" ||
        (data.Languages0 === undefined &&
            data.Languages1 === undefined &&
            data.Languages2 === undefined) ||
        data.PreferedLocation === undefined ||
        data.dprt === "" ||
        data.ectc === "" ||
        (data.Technologies1 === undefined &&
            data.Technologies2 === undefined &&
            data.Technologies3 === undefined &&
            data.Technologies4 === undefined &&
            data.Technologies5 === undefined &&
            data.Technologies0 === undefined)
        ) {
        return res.redirect("/userDetails/validateMsg");
        } else if (!emailregx.test(data.email)) {
        return res.redirect("/userDetails/validateMsg");
        } else if (!pNoregx.test(data.pNo)) {
        return res.redirect("/userDetails/validateMsg");
        } else {
            if(data.id !== ""){
                let upbd = `update candidatemaster set c_fname='${data.fname}',c_lname='${data.lname}', c_designation='${data.Cdesignation}', c_email='${data.email}', c_phoneNo='${data.pNo}', c_address='${data.addr}', c_city='${data.city}', c_state='${data.state}', c_zipcode='${data.zipcode}', c_gender='${data.Gender}', c_relationship='${data.Relationship}', c_dob='${data.DOB}' where id = '${data.id}';`

                let [bdres] = await  connection.query(upbd);

                for(let i = 0; i < data.Course.length; i++){
                    if(data.Course[i] !== ""){
                      let uped = `update education_details set education_type='${data.etype[i]}',course_name='${data.Course[i]}',passing_year='${data.Year[i]}',persentage='${data.Percentage[i]}' where id = '${data.eid[i]}';`
        
                      let [edres] = await connection.query(uped);
                    }
                }

                if (typeof data.companyname === "object") {
                    for (let i = 0; i < data.companyname.length; i++) {
                      if (data.companyname[i] !== "") {
                        let upwe = `update work_experience_details set company_name='${data.companyname[i]}',current_designation='${data.designation[i]}',joining_date='${data.from[i]}',leaving_date='${data.to[i]}' where id = '${data.wid[i]}';`;
            
                        let [weres] = await connection.query(upwe);
                      }
                    }
                } else {
                    if (data.companyname !== "") {
                      let upwe = `update work_experience_details set company_name='${data.companyname}',current_designation='${data.designation}',joining_date='${data.from}',leaving_date='${data.to}' where id = '${data.wid}';`;
            
                        let [weres] = await connection.query(upwe);
                    }
                }

                if (typeof data.rname === "object") {
                    for (let i = 0; i < data.rname.length; i++) {
                      if (data.rname[i] !== "") {
                        let RDsql = `update reference_details set reference_name='${data.rname[i]}',reference_phoneNo='${data.cnum[i]}',relation='${data.rel[i]}' where id = ${data.rid[i]};`;
            
                        let [RDres] = await connection.query(RDsql);
                      }
                    }
                } else {
                    if (data.rname !== "") {
                      let RDsql = `update reference_details set reference_name='${data.rname}',reference_phoneNo='${data.cnum}',relation='${data.rel}' where id = ${data.rid};`;
          
                      let [RDres] = await connection.query(RDsql);
                    }
                }

                let lngSQL = `delete from know_languages where cid = ${data.id};`
                let [lngRes] = await connection.query(lngSQL);

                if (data.Languages0 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${data.id}, "${data.Languages0}","${data.lnglevel0}")`;
                    let [Lresult] = await connection.query(Lsql);
                }
                if (data.Languages1 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${data.id}, "${data.Languages1}","${data.lnglevel1}")`;
                    let [Lresult] = await connection.query(Lsql);
                }
                if (data.Languages2 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${data.id}, "${data.Languages2}","${data.lnglevel2}")`;
                    let [Lresult] = await connection.query(Lsql);
                }

                let techSQL = `delete from technologies where cid = ${data.id};`
                let [techRES] = await connection.query(techSQL);

                if (data.Technologies0 !== undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies0}","${data.level0}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies1 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies1}","${data.level1}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies2 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies2}","${data.level2}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies3 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies3}","${data.level3}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies4 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies4}","${data.level4}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies5 != undefined) { 
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${data.id}, "${data.Technologies5}","${data.level5}")`;
                    let [Tresult] = await connection.query(Tsql);
                }

                let PDSQL = `delete from preference_details where cid = ${data.pid};`
                let [PDres] = await connection.query(PDSQL);

                if (typeof data.PreferedLocation === "object") {
                    for (let i = 0; i < data.PreferedLocation.length; i++) {
                        if (data.PreferedLocation[i] !== "") {
                        if (data.NP === "" || data.cctc === "") {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC) values (${data.pid}, "${data.PreferedLocation[i]}", "${data.dprt}", "${data.ectc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        } else {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC,notice_period,current_CTC) values (${data.pid}, "${data.PreferedLocation[i]}", "${data.dprt}", "${data.ectc}","${data.NP}","${data.cctc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        }
                        }
                    }
                } else {
                    if (data.PreferedLocation !== "") {
                        if (data.NP === "" || data.cctc === "") {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC) values (${data.pid}, "${data.PreferedLocation[i]}", "${data.dprt}", "${data.ectc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        } else {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC,notice_period,current_CTC) values (${data.pid}, "${data.PreferedLocation}", "${data.dprt}", "${data.ectc}","${data.NP}","${data.cctc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        }
                    }
                }

                return res.redirect("/userDetails/ajaxform");
            } else {
                let BDsql = `insert into candidatemaster (c_fname,c_lname, c_designation, c_email, c_phoneNo, c_address, c_city, c_state, c_zipcode, c_gender, c_relationship, c_dob) values ("${data.fname}","${data.lname}","${data.Cdesignation}","${data.email}","${data.pNo}","${data.addr}","${data.city}","${data.state}", "${data.zipcode}","${data.Gender}","${data.Relationship}","${data.DOB}");`;
      
                let [BDresult] = await connection.query(BDsql);
      
                let cid = BDresult.insertId;
      
                for (let i = 0; i < data.Course.length; i++) {
                    if (data.Course[i] !== "") {
                        let EDsql = `insert into education_details(cid,education_type,course_name,passing_year,persentage) values (${cid},"${data.etype[i]}", "${data.Course[i]}", "${data.Year[i]}", "${data.Percentage[i]}");`;
            
                        let [EDresult] = await connection.query(EDsql);
                    }
                }
                if (typeof data.companyname === "object") {
                    for (let i = 0; i < data.companyname.length; i++) {
                        if (data.companyname[i] !== "") {
                            let WEsql = `insert into work_experience_details(cid,company_name,current_designation,joining_date,leaving_date) values (${cid}, "${data.companyname[i]}", "${data.designation[i]}", "${data.from[i]}", "${data.to[i]}");`;
                
                            let [WEresult] = await connection.query(WEsql);
                        }
                    }
                } else {
                    if (data.companyname !== "") {
                        let WEsql = `insert into work_experience_details(cid,company_name,current_designation,joining_date,leaving_date) values (${cid}, "${data.companyname}", "${data.designation}", "${data.from}", "${data.to}");`;
            
                        let [WEresult] = await connection.query(WEsql);
                    }
                }
      
                if (data.Languages0 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${cid}, "${data.Languages0}","${data.lnglevel0}")`;
                    let [Lresult] = await connection.query(Lsql);
                }
                if (data.Languages1 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${cid}, "${data.Languages1}","${data.lnglevel1}")`;
                    let [Lresult] = await connection.query(Lsql);
                }
                if (data.Languages2 !== undefined) {
                    let Lsql = "";
                    Lsql += `insert into know_languages(cid,Languages,languages_mode) values (${cid}, "${data.Languages2}","${data.lnglevel2}")`;
                    let [Lresult] = await connection.query(Lsql);
                }
        
                if (data.Technologies0 !== undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies0}","${data.level0}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies1 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies1}","${data.level1}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies2 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies2}","${data.level2}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies3 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies3}","${data.level3}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies4 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies4}","${data.level4}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
                if (data.Technologies5 != undefined) {
                    let Tsql = "";
                    Tsql += `insert into technologies(cid,tech_name,tech_level) values (${cid}, "${data.Technologies5}","${data.level5}")`;
                    let [Tresult] = await connection.query(Tsql);
                }
        
                if (typeof data.rname === "object") {
                    for (let i = 0; i < data.rname.length; i++) {
                        if (data.rname[i] !== "") {
                        let RDsql = `insert into reference_details(cid,reference_name,reference_phoneNo,relation) values (${cid}, "${data.rname[i]}", "${data.cnum[i]}", "${data.rel[i]}");`;
            
                        let [RDres] = await connection.query(RDsql);
                        }
                    }
                } else {
                    if (data.rname !== "") {
                        let RDsql = `insert into reference_details(cid,reference_name,reference_phoneNo,relation) values (${cid}, "${data.rname}", "${data.cnum}", "${data.rel}");`;
            
                        let [RDres] = await connection.query(RDsql);
                    }
                }
        
                if (typeof data.PreferedLocation === "object") {
                    for (let i = 0; i < data.PreferedLocation.length; i++) {
                        if (data.PreferedLocation[i] !== "") {
                        if (data.NP === "" || data.cctc === "") {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC) values (${cid}, "${data.PreferedLocation[i]}", "${data.dprt}", "${data.ectc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        } else {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC,notice_period,current_CTC) values (${cid}, "${data.PreferedLocation[i]}", "${data.dprt}", "${data.ectc}","${data.NP}","${data.cctc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        }
                        }
                    }
                } else {
                    if (data.PreferedLocation !== "") {
                        if (data.NP === "" || data.cctc === "") {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC) values (${cid}, "${data.PreferedLocation}", "${data.dprt}", "${data.ectc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        } else {
                            let PDsql = "";
                            PDsql = `insert into preference_details(cid,prefered_location,department,expacted_CTC,notice_period,current_CTC) values (${cid}, "${data.PreferedLocation}", "${data.dprt}", "${data.ectc}","${data.NP}","${data.cctc}");`;
                            let [PDresult] = await connection.query(PDsql);
                        }
                    }
                }
                return res.redirect("/userDetails/welcome");
            }
        }
    } catch (error) {
        console.log("AJAX validation function: "+error.message);
    }
}