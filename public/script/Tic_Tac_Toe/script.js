let currentUser = "O";
let arr = new Array(9).fill(null);
let scoreO = 0;
let scoreX = 0;

function play(e) {
    let id = e.target.id;
    if(arr[id] !== null) return;
    arr[id] = currentUser;
    const td = document.querySelectorAll("td");
    td[id].innerHTML = currentUser;
    findWinner();
    currentUser = currentUser === "O" ? "X" : "O";
}

function findWinner() {
    let win = false;
    if( arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2] ||
        arr[3] !== null && arr[3] === arr[4] && arr[4] === arr[5] ||
        arr[6] !== null && arr[6] === arr[7] && arr[7] === arr[8] ||
        arr[0] !== null && arr[0] === arr[3] && arr[3] === arr[6] ||
        arr[1] !== null && arr[1] === arr[4] && arr[4] === arr[7] ||
        arr[2] !== null && arr[2] === arr[5] && arr[5] === arr[8] ||
        arr[0] !== null && arr[0] === arr[4] && arr[4] === arr[8] ||
        arr[2] !== null && arr[2] === arr[4] && arr[4] === arr[6] ){

            alert("Winner is : " + currentUser);
            win = true;
            if(currentUser === "O"){
                scoreO++;
                document.getElementById("scoreO").innerHTML = "O Score: " + scoreO;
            }
            else{
                scoreX++;
                document.getElementById("scoreX").innerHTML = "X Score: "+ scoreX;
            }
            const td = document.querySelectorAll("td");
            td.forEach((td => {
                td.removeEventListener("click", play);
            }))
    }
    if((!arr.some(e => e === null) && win == false)){
        alert("Match Draw!");
    }
}


const table = document.getElementById("maintable");

function initialTable() {
    let cellid = 0;
    table.innerHTML = "";
    arr.fill(null);
    for(let i = 0; i < 3; i++){
        const tr = document.createElement("tr");
        for(let j = 0; j < 3; j++){
            const td = document.createElement("td");
            tr.appendChild(td);
            td.id = cellid;
            cellid++;
            console.log(td.id);
        }
        table.appendChild(tr);
    }
    document.querySelectorAll("td").forEach((td)=> {
        td.addEventListener("click", play);
    })
}

const restart = document.getElementById("restart");
restart.addEventListener("click", initialTable);



document.querySelectorAll("td").forEach((td) => {
    td.addEventListener("click", play);
})
