const pass = document.getElementById('password')
const repass = document.getElementById('repassword')
const change = document.getElementById('change')

change.addEventListener('click', async ()=>{
    if(pass.value !== repass.value){
        document.getElementById('err').innerHTML = "Both Password does't match"
    } else {
        let passData = await fetch(`/repassword${window.location.search}`, {
            method:"POST",
            body: JSON.stringify({pass: pass.value, repass: repass.value, email:window.location.search.split('&')[0].split('=')[1]}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        passData = await passData.json()

        if(passData.message){
            document.getElementById('err').innerHTML = passData.message;
        } else {
            alert(passData.success);
            window.location = '/login';
        }

    }
})
