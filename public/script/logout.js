const logoutbtn = document.getElementById('logout');

const profilebtn = document.getElementById('profilebtn');

let toggle = true;
profilebtn.addEventListener('click', ()=>{
    if(!toggle){
        document.getElementById('details').style.display = "none";
        toggle = true;
    } else {
        document.getElementById('details').style.display = "block"
        toggle = false;
    }  
    console.log(toggle); 
})


logoutbtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    let log = await fetch('/logout', {
        method:"GET",
    })

    log = await log.json();

    if(log.success === "success"){
        localStorage.removeItem('token');
        window.location = '/'
    }
})

const otherbtn = document.getElementById('otherbtn');

let otherToggle = false;
otherbtn.addEventListener('click', ()=>{
    if(!otherToggle){
        document.getElementById('otherTask').style.display = "flex";
        otherToggle = true;
    } else {
        document.getElementById('otherTask').style.display = "none"
        otherToggle = false;
    }  
})