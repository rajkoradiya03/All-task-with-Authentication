const table = document.getElementById("maintable");

function addrow() {
    const table = document.getElementById("maintable");
    const clone = table.querySelector("tr").cloneNode(true);
    table.appendChild(clone);
}

const btn = document.getElementById("addrow");

btn.addEventListener("click", addrow);

const btn2 = document.getElementById("rmrow");

function rmrow () {
    if(document.getElementById("maintable").rows.length > 2) 
    {
        const table = document.querySelector("table");
        table.removeChild(table.lastChild);
    }
}

btn2.addEventListener("click", rmrow);

function addcolmn() {
    
    const tr = document.querySelector("tr");

    document.querySelectorAll("tr").forEach((tr)=> {
        const addcol = document.createElement("td");
        tr.appendChild(addcol);
    })
}

document.getElementById("addcol").addEventListener("click", addcolmn);


function rmcolumn() {
    if(table.rows.length >= 2 && document.querySelector("tr").childElementCount > 2) {
        const tr = document.querySelector("tr");
        document.querySelectorAll("tr").forEach((tr) => {
            tr.removeChild(tr.lastChild);
        })
    }
    
}

document.getElementById("rmcol").addEventListener("click", rmcolumn);