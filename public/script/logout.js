const logoutbtn = document.getElementById('logout');

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