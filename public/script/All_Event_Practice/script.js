const onclick = document.querySelector("#onclick");

function OnClick() {
    alert("OnClick Triggerd!!!");
}

onclick.addEventListener("click", OnClick)

// <--------------------------------------------------------------------->

let x = document.getElementById("focus");
function OnFocus() {
    alert("OnFocus Triggerd!!!");
    x.style.borderColor = "aqua";
}

x.addEventListener("focus", OnFocus, true);

// <------------------------------------------------------------------------>

let y = document.getElementById("blur");
function OnBlur() {
    alert("OnBlur Triggerd!!!");
    x.style.backgroundColor = " ";
}

y.addEventListener("blur", OnBlur, true);

// <--------------------------------------------------------------------------->

let c1 = document.getElementById("change1");

c1.addEventListener("change", ()=> {
    alert("OnChange Triggerd!! and Change value is: " + c1.value);
});
let c2 = document.getElementById("change2");

c2.addEventListener("change", ()=> {
    alert("OnChange Triggerd!! and Change value is: " + c2.value);
});

// <-------------------------------------------------------------------------------->

let cm = document.getElementById("contextChange");

cm.addEventListener("contextmenu", (c) => {
    c.preventDefault();
});

// <--------------------------------------------------------------------------------->

let dc = document.getElementById("doubleClick");

dc.addEventListener("dblclick", () => {
    alert("OnDoubleClick Event Triggerd!!!!!");
});

// <------------------------------------------------------------------------------------->

document.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("Text", e.target.id);
});

document.addEventListener("dragenter", (e) => {
    document.getElementById("dragclass").style.backgroundColor = "black";
});

document.addEventListener("dragleave", () => {
    document.getElementById("dragclass").style.backgroundColor = "white";
})
document.addEventListener ("dragend", function (e) {
    alert("The text is end to drag.")
});

document.addEventListener("drag", function (e) {
    document.getElementById("text").innerHTML = "The text is draging.";
});

document.addEventListener("dragover", function(e) {
    e.preventDefault();
});

document.addEventListener("drop", function(e) {
    e.preventDefault();
    if(e.target.className == "droptarget"){
        const data = e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(data));
        document.getElementById("text").innerHTML = "The text is drop.";
    }
});

// <------------------------------------------------------->
let t = document.getElementById("text1");

t.addEventListener("input", () => {
    let x = t.value;
    document.getElementById("ai").innerHTML = "Input is: " + x;
});

// <--------------------------------------------------------->

let n = document.getElementById("number");

n.addEventListener("invalid", () => {
    alert("Please enter valid number!!!");
});

document.getElementById("form").addEventListener("reset", ()=> {
    document.getElementById("at").innerHTML = "This form is reset.";
});

document.getElementById("form").addEventListener("submit", ()=> {
    alert("This form is submitted.");
});
// <--------------------------------------------------------->


let kd = document.getElementById("kd");

kd.addEventListener("keydown", ()=> {
    kd.style.backgroundColor = "grey";
});

// <--------------------------------------------------------->

let kp = document.getElementById("kp");

kp.addEventListener("keypress", () => {
    kp.style.backgroundColor = "black";
    kp.style.color = "white";
});

// <------------------------------------------------------->

let ku = document.getElementById("ku");

ku.addEventListener("keyup", () => {
    document.getElementById("add").innerHTML += ku.value; 
});

// <------------------------------------------------------>

document.getElementById("md").addEventListener("mousedown", ()=> {
    document.getElementById("md").style.color = "green";
});

document.getElementById("md").addEventListener("mouseup",() => {
    document.getElementById("md").style.color = "Black";
});
// <----------------------------------------------------->

let me = document.getElementById("me");

me.addEventListener("mouseenter",()=> {
    me.style.backgroundColor = "black";
    me.style.color = "green";
});

me.addEventListener("mouseleave", () => {
    me.style.backgroundColor = "white";
    me.style.color = "black";
});

// <------------------------------------------------------->
let mm = document.getElementById("mm");

mm.addEventListener("mousemove", (e)=> {
    const x = e.clientX;
    const y = e.clientY;

    document.getElementById("coor").innerHTML = "Coordinate" + x + ", " +y;
});

// <------------------------------------------------------>

let mo = document.getElementById("mo");

mo.addEventListener("mouseover", ()=> {
    mo.style.fontSize = "25px";
});

mo.addEventListener("mouseout", ()=> {
    mo.style.fontSize = "15px";
});

//<------------------------------------------------------>

let mw = document.getElementById("mw");

mw.addEventListener("wheel", ()=> {
    mw.innerHTML = "wheel rotate";  
});

// <------------------------------------------------------>
let p = document.getElementById("pointer");

p.addEventListener("pointerenter", () => {
    p.innerHTML = "Pointer is Enter.";
});

p.addEventListener("pointermove", ()=> {
    p.style.color = "red";
});

// <------------------------------------------------------>

window.addEventListener("resize", Resetfun);

var num = 0;
function Resetfun() {
    var text = num += 1;
    document.getElementById("resize").innerHTML += text;
}

// <------------------------------------------------------>

document.getElementById("scroll").addEventListener("scroll", ()=> {
    document.getElementById("sc").innerHTML = "Scrolling."
});

document.getElementById("select").addEventListener("select", ()=> {
    document.getElementById("selecttext").innerHTML = "Text is select."
});

document.getElementById("toggle").addEventListener("toggle", ()=> {
    alert("Toggle Triggerd!!!");
});

window.addEventListener("unload", ()=> {
    alert("This windows is closed.")
});

let change = document.getElementById("bike");

change.addEventListener("change", ()=> {
    let c = change.value;
    document.getElementById("change").innerHTML = "Your choice change: " + c;
});