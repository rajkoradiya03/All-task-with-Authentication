const wp = document.getElementById("wp");
const m = document.getElementById("m");
const l = document.getElementById("l");
const php = document.getElementById("p");
const desc = document.getElementById("desc");
const color = "#F0F6FF"

function WordPress(){
    wp.style.backgroundColor = color;
    wp.style.opacity = 1;
    m.style.opacity = 0.8;
    m.style.backgroundColor = " ";
    l.style.opacity = 0.5
    l.style.backgroundColor = " ";
    php.style.opacity = 0.3
    php.style.backgroundColor =" ";
    desc.innerHTML = " ";
    desc.innerHTML = `<div class="s5textbox">
    <h3>The Best Managed Cloud Hosting for WordPress</h3>
    <p>We live and breathe WordPress. Our managed hosting for WordPress and WooCommerce takes away cloud server related hassles so you can scale your website the way you want.</p>
</div>
<div class="descrow">
    <div class="desccol">
        <div class="desccard">
            <img src="./practical_2/assets/Vector.png" alt="right" height="20" width="20">
            <p>Unlimited Bandwidth</p>
        </div>
    </div>
    <div class="desccol">
        <div class="desccard">
            <img src="./practical_2/assets/Vector.png" alt="right" height="20" width="20">
            <p>Network Speed</p>
        </div>
    </div>
    <div class="desccol">
        <div class="desccard">
            <img src="./practical_2/assets/Vector.png" alt="right" height="20" width="20">
            <p>Turbo Power</p>
        </div>
    </div>
    <div class="desccol">
        <div class="desccard">
            <img src="./practical_2/assets/Vector.png" alt="right" height="20" width="20">
            <p>Xtreme Freedom</p>
        </div>
    </div>
</div>
<button>More Detail</button>`
}
function Magento(){
    m.style.backgroundColor = color;
    m.style.opacity = 1
    wp.style.opacity = 0.8
    wp.style.backgroundColor = " ";
    l.style.opacity = 0.5;
    l.style.backgroundColor = " ";
    php.style.opacity = 0.3
    php.style.backgroundColor =" ";
    desc.innerHTML = " ";
    desc.innerHTML = `<h3>Magento</h3>`
}
function laravel(){
    l.style.backgroundColor = color;
    l.style.opacity = 1;
    wp.style.opacity = 0.8
    wp.style.backgroundColor = " ";
    m.style.backgroundColor = " ";
    m.style.opacity = 0.5
    php.style.opacity = 0.3
    php.style.backgroundColor =" ";
    desc.innerHTML = " ";
    desc.innerHTML = `<h3>Laravel</h3>`
}
function PHP(){
    php.style.backgroundColor = color;
    php.style.opacity = 1
    wp.style.opacity = 0.8
    wp.style.backgroundColor = " ";
    m.style.backgroundColor = " ";
    m.style.opacity = 0.5
    l.style.opacity = 0.3
    l.style.backgroundColor =" ";
    desc.innerHTML = " ";
    desc.innerHTML = `<h3>PHP</h3>`
}

wp.addEventListener("click", WordPress);
m.addEventListener("click", Magento);
l.addEventListener("click", laravel);
php.addEventListener("click", PHP);


const sc = document.querySelector(".s6row");
const card = document.querySelectorAll(".s6col");
const length = card.length;
console.log(length);

let currentPosition = 0;

const left = document.querySelector(".left");
const right = document.querySelector(".right");

right.addEventListener("click", () => {
    currentPosition = (currentPosition + 1) % (length - 2);
    showTransition(currentPosition);
})

left.addEventListener("click", () => {
    currentPosition = (length + currentPosition - 3) % (length - 2);
    showTransition(currentPosition);
})

function showTransition(index) {
    let position = -index*420 + "px";
    sc.style = `transition: all 0.5s ease-in-out`;
    sc.style.transform = "translateX(" + position+ ")";
}