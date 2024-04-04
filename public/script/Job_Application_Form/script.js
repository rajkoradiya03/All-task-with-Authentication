let msg = document.getElementsByClassName("msg");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  if (!validate()) {
    e.preventDefault();
  } else {
    validate();
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

function validate() {
  let isvalid = true;
  valid.forEach((e) => {
    if (e.value === "") {
      if (e.parentElement.lastElementChild.nodeName !== "P") {
        const p = document.createElement("p");
        e.insertAdjacentElement("afterend", p);
        p.classList = "err";
        p.innerHTML = "Feild Required!";
        p.style.color = "red";
        e.addEventListener("focus", () => {
          if (e.value === "") {
            e.parentElement.removeChild(e.parentElement.children[1]);
          }
        });
        isvalid = false;
      }
    }
  });

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
          isvalid = false;
        }
      }
    }
  }

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
    let BU = document.getElementById("Buniversity");
    let BPY = document.getElementById("BPY");
    let BPR = document.getElementById("BPR");
    if (BU.value === "") {
      if (BU.parentElement.lastElementChild.nodeName !== "P") {
        let p = document.createElement("p");
        p.textContent = "Feild Required!";
        p.style.color = "red";
        p.classList = "errmsg";
        BU.insertAdjacentElement("afterend", p);
        BU.addEventListener("focus", () => {
          if (BU.value === "") {
            BU.parentElement.removeChild(BU.parentElement.children[1]);
          }
        });
        isvalid = false;
      }
    }

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
    let MU = document.getElementById("Muniversity");
    let MPY = document.getElementById("MPY");
    let MPR = document.getElementById("MPR");
    if (MU.value === "") {
      if (MU.parentElement.lastElementChild.nodeName !== "P") {
        let p = document.createElement("p");
        p.textContent = "Feild Required!";
        p.style.color = "red";
        p.classList = "errmsg2";
        MU.insertAdjacentElement("afterend", p);
        MU.addEventListener("focus", () => {
          if (MU.value === "") {
            MU.parentElement.removeChild(MU.parentElement.children[1]);
          }
        });
        isvalid = false;
      }
    }

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

  let relationship = document.getElementById("Relationship");
  if (relationship.value === "") {
    msg[3].innerHTML = "Select Status!";
    msg[3].style.color = "Red";
    isvalid = false;
  } else {
    msg[3].innerHTML = "";
  }

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
    let beginer = document.getElementById("level01");
    let mediator = document.getElementById("level02");
    let expert = document.getElementById("level03");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (mysql.checked) {
    let beginer = document.getElementById("level11");
    let mediator = document.getElementById("level12");
    let expert = document.getElementById("level13");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (laravel.checked) {
    let beginer = document.getElementById("level21");
    let mediator = document.getElementById("level22");
    let expert = document.getElementById("level23");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (nodejs.checked) {
    let beginer = document.getElementById("level31");
    let mediator = document.getElementById("level32");
    let expert = document.getElementById("level33");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (dotnet.checked) {
    let beginer = document.getElementById("level41");
    let mediator = document.getElementById("level42");
    let expert = document.getElementById("level43");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  if (reactjs.checked) {
    let beginer = document.getElementById("level51");
    let mediator = document.getElementById("level52");
    let expert = document.getElementById("level53");

    isvalid = checktechLevel(beginer, mediator, expert, isvalid);
  }

  let prefcity = document.getElementById("PreferedLocation");

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
      msg[14].innerHTML = "Feild Required!";
      msg[14].style.color = "red";
      isvalid = false;
    } else if (!npregx.test(np.value)) {
      msg[14].innerHTML = "Month Enter in number only";
      msg[14].style.color = "red";
      isvalid = false;
    } else if (Number(np.value) > 12) {
      msg[14].innerHTML = "Month not more than 12!";
      msg[14].style.color = "red";
      isvalid = false;
    }
    if (currctc.value === "") {
      msg[15].innerHTML = "Feild Required!";
      msg[15].style.color = "red";
      isvalid = false;
    } else if (!ctcreg.test(currctc.value)) {
      msg[15].innerHTML = "CTC Enter in Number only!";
      msg[15].style.color = "red";
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

function addExperienceDetailsRow() {
  const workexptable = document.getElementById("workexp");
  let tr = document.createElement("tr");
  console.log(tr);
  tr.innerHTML = `<td>
                  <label for="companyname">Company Name:</label>
                </td>
                <td>
                  <input type="text" name="companyname" id="cname1" />
                </td>
                <td>
                  <label for="designation">Designation:</label>
                </td>
                <td>
                  <input type="text" name="designation" id="designation1" />
                </td>
                <td>
                  <label for="from">Starting Date:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="from"
                    id="from1"
                    placeholder="2024/01/01"
                  />
                </td>
                <td>
                  <label for="to">Leaving Date:</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="to"
                    id="to1"
                    placeholder="2024/01/01"
                  />
                </td>`;
  workexptable.appendChild(tr);
}

function addReferenceDetailsRow() {
  const refTable = document.getElementById("refcon");

  const tr = document.createElement("tr");
  tr.innerHTML = `<td>
                  <label for="name">Name:</label>
                </td>
                <td>
                  <input type="text" name="rname" id="rname1" />
                </td>
                <td>
                  <label for="cnum">Contact Number:</label>
                </td>
                <td>
                  <input type="text" name="cnum" id="cnum1" maxlength="10" />
                </td>
                <td>
                  <label for="rel">Relation:</label>
                </td>
                <td>
                  <input type="text" name="rel" id="rel1" />
                </td>`;
  refTable.appendChild(tr);
}
