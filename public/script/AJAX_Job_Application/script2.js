const prev1 = document.getElementById("prev1");
const next1 = document.getElementById("next1");
const prev2 = document.getElementById("prev2");
const next2 = document.getElementById("next2");
const prev3 = document.getElementById("prev3");
const next3 = document.getElementById("next3");
const prev4 = document.getElementById("prev4");
const next4 = document.getElementById("next4");
const prev5 = document.getElementById("prev5");
const next5 = document.getElementById("next5");
const prev6 = document.getElementById("prev6");
const BD = document.getElementById("BD");
const ED = document.getElementById("ED");
const WE = document.getElementById("WE");
const LT = document.getElementById("LT");
const RD = document.getElementById("RD");
const PD = document.getElementById("PD");
next1.addEventListener("click", () => {
  if (validation()) {
    BD.style.display = "none";
    ED.style.display = "block";
  } else {
    validation();
  }
});

prev2.addEventListener("click", () => {
  ED.style.display = "none";
  BD.style.display = "block";
});

next2.addEventListener("click", () => {
  if (EDvalidation()) {
    ED.style.display = "none";
    WE.style.display = "block";
  } else {
    EDvalidation();
  }
});

next3.addEventListener("click", () => {
  if (WEvalidation()) {
    WE.style.display = "none";
    LT.style.display = "block";
  } else {
    WEvalidation();
  }
});

prev3.addEventListener("click", () => {
  ED.style.display = "block";
  WE.style.display = "none";
});

next4.addEventListener("click", () => {
  if (LngTechvalidation()) {
    LT.style.display = "none";
    RD.style.display = "block";
  } else {
    LngTechvalidation();
  }
});

prev4.addEventListener("click", () => {
  WE.style.display = "block";
  LT.style.display = "none";
});

next5.addEventListener("click", () => {
  RD.style.display = "none";
  PD.style.display = "block";
});

prev5.addEventListener("click", () => {
  LT.style.display = "block";
  RD.style.display = "none";
});

prev6.addEventListener("click", () => {
  PD.style.display = "none";
  RD.style.display = "block";
});

let form = document.querySelector("form");
let msg = document.getElementsByClassName("msg");
form.addEventListener("submit", async (e) => {
  if (!PDvalidation()) {
    e.preventDefault();
  } else {
    PDvalidation();
    const data = new URLSearchParams();
    for(let pair of new FormData(form)){
      data.append(pair[0], pair[1]);
    }
    await fetch('/userDetails/ajaxform', {
      method: "post",
      body: data,
    })
  }
});

let valid = document.querySelectorAll(".valid");
valid.forEach((e) => {
  const p = document.createElement("p");
  e.addEventListener("focus", () => {
    e.insertAdjacentElement("afterend", p);
    p.innerHTML = "Feild Required!";
    p.style.color = "red";
  });

  e.addEventListener("blur", () => {
    p.innerHTML = "";
  });
});

function validation() {
  let isvalid = true;
    valid.forEach((e) => {
      if (e.value === "") {
        if (e.parentElement.lastElementChild.nodeName !== "P") {
          const p = document.createElement("p");
          e.insertAdjacentElement("afterend", p);
          p.classList = "err";
          p.innerHTML = "Feild Required!";
          p.style.color = "red";
        }
        e.addEventListener("focus", () => {
          if (e.value === "") {
            e.parentElement.removeChild(e.parentElement.children[1]);
          }
        });
        isvalid = false;
      }
    });

    let email = document.getElementById("email");
    let emailregx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (!emailregx.test(email.value.toLowerCase())) {
      msg[0].innerHTML = "Enter valid Email!";
      msg[0].style.color = "Red";
      isvalid = false;
    } else {
      msg[0].innerHTML = "";
    }

    let pNo = document.getElementById("pNo");
    let pNoregx = /^(\d){10}$/;
    if (!pNoregx.test(pNo.value)) {
      msg[1].innerHTML = "Enter Valid Number!";
      msg[1].style.color = "Red";
      isvalid = false;
    } else {
      msg[1].innerHTML = "";
    }

    let male = document.getElementById("male");
    let female = document.getElementById("female");
    if (!male.checked && !female.checked) {
      msg[2].innerHTML = "Select any one!";
      msg[2].style.color = "Red";
      isvalid = false;
    } else {
      msg[2].innerHTML = "";
    }

    let relationship = document.getElementById("Relationship");
    if (relationship.value === "") {
      msg[3].innerHTML = "Select Status!";
      msg[3].style.color = "Red";
      isvalid = false;
    } else {
      msg[3].innerHTML = "";
    }

  if (isvalid == false) {
    return false;
  } else {
    return true;
  }
}

function EDvalidation() {
  let EDvalid = document.querySelectorAll(".EDvalid");
  let isvalid = true;
    EDvalid.forEach((e) => {
      if (e.value === "") {
        if (e.parentElement.lastElementChild.nodeName !== "P") {
          const p = document.createElement("p");
          e.insertAdjacentElement("afterend", p);
          p.classList = "err";
          p.innerHTML = "Feild Required!";
          p.style.color = "red";
        }
        e.addEventListener("focus", () => {
          if (e.value === "") {
            e.parentElement.removeChild(e.parentElement.children[1]);
          }
        });
        isvalid = false;
      }
    });

    let course = document.getElementsByName("Course");
    if (course[0].value === "") {
      msg[4].innerHTML = "Select Course!";
      msg[4].style.color = "Red";
      isvalid = false;
    } else {
      msg[4].innerHTML = "";
    }

    if (course[1].value === "") {
      msg[5].innerHTML = "Select course!";
      msg[5].style.color = "Red";
      isvalid = false;
    } else {
      msg[5].innerHTML = "";
    }

    if (course[2].value !== "") {
      if (BPY.value === "") {
        if (BPY.parentElement.lastElementChild.nodeName !== "P") {
          let p = document.createElement("p");
          p.textContent = "Feild Required!";
          p.style.color = "red";
          p.classList = "errmsg";
          BPY.insertAdjacentElement("afterend", p);
          BPY.addEventListener("focus", () => {
            if (BPY.value === "") {
              BPY.parentElement.removeChild(BPY.parentElement.children[1]);
            }
          });
          isvalid = false;
        }
      }

      if (BPR.value === "") {
        if (BPR.parentElement.lastElementChild.nodeName !== "P") {
          let p = document.createElement("p");
          p.textContent = "Feild Required!";
          p.style.color = "red";
          p.classList = "errmsg";
          BPR.insertAdjacentElement("afterend", p);
          BPR.addEventListener("focus", () => {
            if (BPR.value === "") {
              BPR.parentElement.removeChild(BPR.parentElement.children[1]);
            }
          });
          isvalid = false;
        }
      }
    }

    if (course[3].value !== "") {
      if (MPY.value === "") {
        if (MPY.parentElement.lastElementChild.nodeName !== "P") {
          let p = document.createElement("p");
          p.textContent = "Feild Required!";
          p.style.color = "red";
          p.classList = "errmsg2";
          MPY.insertAdjacentElement("afterend", p);
          MPY.addEventListener("focus", () => {
            if (MPY.value === "") {
              MPY.parentElement.removeChild(MPY.parentElement.children[1]);
            }
          });
          isvalid = false;
        }
      }

      if (MPR.value === "") {
        if (MPR.parentElement.lastElementChild.nodeName !== "P") {
          let p = document.createElement("p");
          p.textContent = "Feild Required!";
          p.style.color = "red";
          p.classList = "errmsg2";
          MPR.insertAdjacentElement("afterend", p);
          MPR.addEventListener("focus", () => {
            if (MPR.value === "") {
              MPR.parentElement.removeChild(MPR.parentElement.children[1]);
            }
          });
          isvalid = false;
        }
      }
    }

  if (isvalid == false) {
    return false;
  } else {
    return true;
  }
}

function WEvalidation() {
  let isvalid = true;
  let cname = document.getElementsByName("companyname");
  let designation = document.getElementsByName("designation");
  let from = document.getElementsByName("from");
  let to = document.getElementsByName("to");

    for (let i = 0; i < cname.length; i++) {
      if (cname[i].value !== "") {
        if (
          designation[i].value === "" ||
          from[i].value === "" ||
          to[i].value === ""
        ) {
          if (
            designation[i].parentElement.lastElementChild.nodeName !== "P" ||
            from[i].parentElement.lastElementChild.nodeName !== "P" ||
            to[i].parentElement.lastElementChild.nodeName !== "P"
          ) {
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            p1.textContent = "Feild Required!";
            p1.style.color = "red";
            p1.classList = `emsg${i}`;
            p2.textContent = "Feild Required!";
            p2.style.color = "red";
            p2.classList = `emsg${i}`;
            p3.textContent = "Feild Required!";
            p3.style.color = "red";
            p3.classList = `emsg${i}`;
            designation[i].insertAdjacentElement("afterend", p1);
            from[i].insertAdjacentElement("afterend", p2);
            to[i].insertAdjacentElement("afterend", p3);
            designation[i].addEventListener("focus", () => {
              designation[i].parentElement.removeChild(
                designation[i].parentElement.children[1]
              );
            });
            from[i].addEventListener("focus", () => {
              from[i].parentElement.removeChild(
                from[i].parentElement.children[1]
              );
            });
            to[i].addEventListener("focus", () => {
              to[i].parentElement.removeChild(to[i].parentElement.children[1]);
            });
          }
          isvalid = false;
        }
      }
    }
  if (isvalid == false) {
    return false;
  } else {
    return true;
  }
}

function LngTechvalidation() {
  let isvalid = true;
  let hindi = document.getElementById("hindi");
  let english = document.getElementById("english");
  let gujrati = document.getElementById("gujrati");

  if (!hindi.checked && !english.checked && !gujrati.checked) {
    msg[8].innerHTML = "Select Language!";
    msg[8].style.color = "Red";
    isvalid = false;
  } else {
    msg[8].innerHTML = "";
  }

  if (hindi.checked) {
    let read = document.getElementById("lnglevel01");
    let write = document.getElementById("lnglevel02");
    let speak = document.getElementById("lnglevel03");

    isvalid = checkLevel(read, write, speak, isvalid);
  }

  if (english.checked) {
    let read = document.getElementById("lnglevel21");
    let write = document.getElementById("lnglevel22");
    let speak = document.getElementById("lnglevel23");

    isvalid = checkLevel(read, write, speak, isvalid);
  }

  if (gujrati.checked) {
    let read = document.getElementById("lnglevel11");
    let write = document.getElementById("lnglevel12");
    let speak = document.getElementById("lnglevel13");

    isvalid = checkLevel(read, write, speak, isvalid);
  }

  let php = document.getElementById("PHP");
  let mysql = document.getElementById("MySQL");
  let laravel = document.getElementById("Laravel");
  let nodejs = document.getElementById("Nodejs");
  let dotnet = document.getElementById("dotnet");
  let reactjs = document.getElementById("Reactjs");

  if (
    !php.checked &&
    !mysql.checked &&
    !laravel.checked &&
    !nodejs.checked &&
    !dotnet.checked &&
    !reactjs.checked
  ) {
    msg[10].innerHTML = "Select Technologies!";
    msg[10].style.color = "Red";
    isvalid = false;
  } else {
    msg[10].innerHTML = "";
  }

  if (php.checked) {
    let beginer = document.getElementById("level00");
    let mediator = document.getElementById("level01");
    let expert = document.getElementById("level01");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (mysql.checked) {
    let beginer = document.getElementById("level10");
    let mediator = document.getElementById("level11");
    let expert = document.getElementById("level12");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (laravel.checked) {
    let beginer = document.getElementById("level20");
    let mediator = document.getElementById("level21");
    let expert = document.getElementById("level22");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (nodejs.checked) {
    let beginer = document.getElementById("level30");
    let mediator = document.getElementById("level31");
    let expert = document.getElementById("level32");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (dotnet.checked) {
    let beginer = document.getElementById("level40");
    let mediator = document.getElementById("level41");
    let expert = document.getElementById("level42");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (reactjs.checked) {
    let beginer = document.getElementById("level50");
    let mediator = document.getElementById("level51");
    let expert = document.getElementById("level52");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (isvalid == false) {
    return false;
  } else {
    return true;
  }
}

function PDvalidation() {
  let isvalid = true;
  let prefcity = document.getElementById("PreferedLocation");
  let ectc = document.getElementById('ectc');
  if(ectc.value === ""){
    msg[14].innerHTML = "Feild Required!";
    msg[14].style.color = "Red";
    isvalid = false;
  } else {
    msg[14].innerHTML = "";
  }
  if (prefcity.value === "") {
    msg[12].innerHTML = "Select Prefered City!";
    msg[12].style.color = "Red";
    isvalid = false;
  } else {
    msg[12].innerHTML = "";
  }

  let department = document.getElementById("dept");

  if (department.value === "") {
    msg[13].innerHTML = "Select Department!";
    msg[13].style.color = "Red";
    isvalid = false;
  } else {
    msg[13].innerHTML = "";
  }

  let we = document.getElementById("cname1");
  let np = document.getElementById("NP");
  let currctc = document.getElementById("cctc");
  let ctcreg = /[0-9]$/;
  let npregx = /^([0-9]){1,2}$/;
  if (we.value !== "") {
    if (np.value === "") {
      msg[15].innerHTML = "Feild Required!";
      msg[15].style.color = "red";
      isvalid = false;
    } else if (!npregx.test(np.value)) {
      msg[15].innerHTML = "Month Enter in number only";
      msg[15].style.color = "red";
      isvalid = false;
    } else if (Number(np.value) > 12) {
      msg[15].innerHTML = "Month not more than 12!";
      msg[15].style.color = "red";
      isvalid = false;
    }
    if (currctc.value === "") {
      msg[16].innerHTML = "Feild Required!";
      msg[16].style.color = "red";
      isvalid = false;
    } else if (!ctcreg.test(currctc.value)) {
      msg[16].innerHTML = "CTC Enter in Number only!";
      msg[16].style.color = "red";
      isvalid = false;
    }
  }

  if (isvalid === false) {
    return false;
  } else {
    return true;
  }
}

function checkLevel(read, write, speak, isvalid) {
  if (!read.checked && !write.checked && !speak.checked) {
    msg[9].innerHTML = "Select Language Level!";
    msg[9].style.color = "Red";
    isvalid = false;
  } else {
    msg[9].innerHTML = "";
  }
  return isvalid;
}

function checktechLevel(beginer, mediator, expert, isvalid) {
  if (!beginer.checked && !mediator.checked && !expert.checked) {
    msg[11].innerHTML = "Select Technology Level!";
    msg[11].style.color = "Red";
    isvalid = false;
  } else {
    msg[11].innerHTML = "";
  }
  return isvalid;
}

if(window.location.pathname.split('/')[2] === "update"){
  async function candidatedata() {
    let id = window.location.pathname.split('/')[3]
    let data = await fetch(`/userDetails/getData/${id}`, {
      method:"get",
      headers: {
        'Content-type': 'application/json'
      }
    })
    data = await data.json()
    console.log(data);
    console.log(data['PD']);

    document.getElementById('id').value = data['BD'][0]['id']

    let BDdata = document.querySelectorAll('.valid');
    BDdata[0].value = data['BD'][0]['c_fname'];
    BDdata[1].value = data['BD'][0]['c_lname'];
    BDdata[2].value = data['BD'][0]['c_designation'];
    BDdata[3].value = data['BD'][0]['c_email'];
    BDdata[4].value = data['BD'][0]['c_phoneNo'];
    BDdata[5].value = data['BD'][0]['c_address'];
    BDdata[6].value = data['BD'][0]['c_city'];
    BDdata[7].value = data['BD'][0]['c_state'];
    BDdata[8].value = data['BD'][0]['c_zipcode'];
    BDdata[9].value = data['BD'][0]['c_dob'].slice(0,10);

    if(data['BD'][0]['c_gender'] == "Male"){
      document.getElementById('male').setAttribute('checked', true);
    } else {
      document.getElementById('female').setAttribute('checked', true);
    }

    document.getElementById('Relationship').value = data['BD'][0]['c_relationship'];

    document.getElementById('sid').value = data['ED'][0]['id']
    document.getElementById('hid').value = data['ED'][1]['id']

    let Course = document.getElementsByName('Course');
    let Year = document.getElementsByName('Year');
    let Percentage = document.getElementsByName('Percentage');
    
    if(data['ED'][2] == undefined){
      document.getElementById('bid').value = ""
    } else {
      document.getElementById('bid').value = data['ED'][2]['id'];
      Course[2].value = data['ED'][2]['course_name']
      Year[2].value = data['ED'][2]['passing_year']
      Percentage[2].value = data['ED'][2]['persentage']
    }

    if(data['ED'][3] == undefined){
      document.getElementById('mid').value = ""
    } else {
      document.getElementById('mid').value = data['ED'][3]['id'];
      Course[3].value = data['ED'][3]['course_name']
      Year[3].value = data['ED'][3]['passing_year']
      Percentage[3].value = data['ED'][3]['persentage']
    }

    Course[0].value = data['ED'][0]['course_name']
    Course[1].value = data['ED'][1]['course_name']

    Year[0].value = data['ED'][0]['passing_year']
    Year[1].value = data['ED'][1]['passing_year']

    Percentage[0].value = data['ED'][0]['persentage']
    Percentage[1].value = data['ED'][1]['persentage']

    const wid = document.getElementsByName('wid')
    const comName = document.getElementsByName('companyname')
    const designation = document.getElementsByName('designation')
    const startDate = document.getElementsByName('from')
    const leavingDate = document.getElementsByName('to')

    if(data['WD'] !== undefined){
      for(let i = 0; i < data['WD'].length; i++){
        if(data['WD'][i] !== undefined){
          wid[i].value = data['WD'][i]['id']
          comName[i].value = data['WD'][i]['company_name']
          designation[i].value = data['WD'][i]['current_designation']
          startDate[i].value = data['WD'][i]['joining_date'].slice(0,10)
          leavingDate[i].value = data['WD'][i]['leaving_date'].slice(0,10)
        }
      }
    }

    for(let i = 0; i < data['KL'].length; i++){
      if(data['KL'][i]['Languages'] == "Hindi"){
        document.getElementById('id0').value = data['KL'][i]['id']
        document.getElementById('hindi').setAttribute('checked',true)

        let lngLevel = data['KL'][i]['languages_mode'].split(',');

        for(let j = 0; j < lngLevel.length; j++){
          if(lngLevel[j] == "Read"){
            document.getElementById('lnglevel01').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Write"){
            document.getElementById('lnglevel02').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Speak"){
            document.getElementById('lnglevel03').setAttribute('checked',true)
          }
        }
      }
      if(data['KL'][i]['Languages'] == "Gujrati"){
        document.getElementById('id1').value = data['KL'][i]['id']
        document.getElementById('gujrati').setAttribute('checked',true)

        let lngLevel = data['KL'][i]['languages_mode'].split(',');

        for(let j = 0; j < lngLevel.length; j++){
          if(lngLevel[j] == "Read"){
            document.getElementById('lnglevel11').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Write"){
            document.getElementById('lnglevel12').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Speak"){
            document.getElementById('lnglevel13').setAttribute('checked',true)
          }
        }
      }
      if(data['KL'][i]['Languages'] == "English"){
        document.getElementById('id2').value = data['KL'][i]['id']
        document.getElementById('english').setAttribute('checked',true)

        let lngLevel = data['KL'][i]['languages_mode'].split(',');

        for(let j = 0; j < lngLevel.length; j++){
          if(lngLevel[j] == "Read"){
            document.getElementById('lnglevel21').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Write"){
            document.getElementById('lnglevel22').setAttribute('checked',true)
          }
          if(lngLevel[j] == "Speak"){
            document.getElementById('lnglevel23').setAttribute('checked',true)
          }
        }
      }
    }

    for(let i = 0; i < data['Tech'].length; i++){
      if(data['Tech'][i]['tech_name'] == "PHP"){
        document.getElementById('id0').value = data['Tech'][i]['id']
        document.getElementById('PHP').setAttribute('checked',true)

        document.getElementsByName('level0').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }
      if(data['Tech'][i]['tech_name'] == "MySQL"){
        document.getElementById('id1').value = data['Tech'][i]['id']
        document.getElementById('MySQL').setAttribute('checked',true)

        document.getElementsByName('level1').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }
      if(data['Tech'][i]['tech_name'] == "Laravel"){
        document.getElementById('id2').value = data['Tech'][i]['id']
        document.getElementById('Laravel').setAttribute('checked',true)

        document.getElementsByName('level2').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }

      if(data['Tech'][i]['tech_name'] == "NodeJS"){
        document.getElementById('id3').value = data['Tech'][i]['id']
        document.getElementById('Nodejs').setAttribute('checked',true)

        document.getElementsByName('level3').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }

      if(data['Tech'][i]['tech_name'] == ".net"){
        document.getElementById('id4').value = data['Tech'][i]['id']
        document.getElementById('dotnet').setAttribute('checked',true)

        document.getElementsByName('level4').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }

      if(data['Tech'][i]['tech_name'] == "Reactjs"){
        document.getElementById('id5').value = data['Tech'][i]['id']
        document.getElementById('Reactjs').setAttribute('checked',true)

        document.getElementsByName('level5').forEach((t)=>{
          if(t.value == data['Tech'][i]['tech_level']){
            t.setAttribute('checked', true)
          }
        })
      }
    }

    const rid = document.getElementsByName('rid')
    const rname = document.getElementsByName('rname')
    const cnum = document.getElementsByName('cnum')
    const rel = document.getElementsByName('rel')

    if(data['RD'] !== undefined){
      for(let i = 0; i < data['RD'].length; i++){
        if(data['RD'][i] !== undefined){
          rid[i].value = data['RD'][i]['id']
          rname[i].value = data['RD'][i]['reference_name']
          cnum[i].value = data['RD'][i]['reference_phoneNo']
          rel[i].value = data['RD'][i]['relation']
        }
      }
    }

    document.getElementById('pid').value = data['BD'][0]['id']

    document.getElementById('dept').value = data['PD'][0]['department']

    document.getElementById('ectc').value = data['PD'][0]['expacted_CTC']

    if(data['PD'][0]['notice_period'] !== null){
      document.getElementById('NP').value = data['PD'][0]['notice_period']
    }

    if(data['PD'][0]['current_CTC'] !== null){
      document.getElementById('cctc').value = data['PD'][0]['current_CTC']
    }
  }  
  candidatedata()
}