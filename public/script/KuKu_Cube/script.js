let rowcount = 1;
let colcount = 1;


function addcell() {
    var x = Math.floor(Math.random() * 254);
    var y = Math.floor(Math.random() * 254);
    var z = Math.floor(Math.random() * 254);

    var color = "rgb("+x+","+y+","+z+")";

    const table = document.getElementById("maintable");

    table.innerHTML="";
    rowcount++;
    colcount++;

    table.innerHTML = "";

    for(let i = 0; i < rowcount; i++){
        const ar = document.createElement("tr");
        for(let j = 0; j < colcount; j++) {
            const ad = document.createElement("td");
            if(timer) {
                ad.addEventListener("click", evelute);
            }
            ar.appendChild(ad);
            ad.style.backgroundColor = color;
            ad.style.cursor = "pointer";   
        }
        table.appendChild(ar);
    }

    let col = document.querySelectorAll("td");
    let n = Math.floor(Math.random() * col.length);
    col[n].style.opacity = 0.9;
}
const start = document.getElementById("start");
let score = 0;

function evelute(event) {    
    if(event.target.style.opacity) {
        score++;
        addcell();
    }
    else {
        alert("Your Score is: " + score + "Game Over!!!!");
        score = 0;
        window.location.reload();
    }
    document.getElementById("score").innerHTML = "Score:" + score;
}

let num = 20;
let timer;

const pause = document.getElementById("pause");
start.addEventListener("click", function() {
    timer = setInterval(
        function() {
        num = num - 1;
        if(num >= 0){
            document.getElementById("time").innerHTML = num;
        }
        else{
            clearInterval(timer);
            alert("Your Score:"+ score);
            window.location.reload();
        }
    },1000); 
    document.querySelectorAll("td").forEach((td)=> {
        td.addEventListener("click", evelute);
    })
});

const td = document.querySelector("td");

pause.addEventListener("click", function() {
  clearInterval(timer);
  document.querySelectorAll("td").forEach((td) => {
    td.removeEventListener("click", evelute);
  })
});

addcell();