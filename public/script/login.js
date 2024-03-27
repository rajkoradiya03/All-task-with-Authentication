const login = document.getElementById('login')
const username = document.getElementById("username")
const password = document.getElementById("password")
const main = document.getElementById('main');
if(getItemLocal('token')){
    window.location = '/userDetails'
}
login.addEventListener('click', async ()=>{
    let data = {
        username: username.value,
        password: password.value
    }
    let auth = await fetch('/login',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })

    auth = await auth.json();
    
    if(auth.errmessage){
        document.getElementById('err').innerHTML = auth.errmessage;
    } else {
        // window.location = '/userDetails'
        main.innerHTML = "";
        let p = document.createElement('p');
        p.textContent = auth.message
        
        let btn = document.createElement('a');
        btn.textContent = "Dashboard"
        btn.className = "btn";
        btn.href = '/userDetails'

        main.appendChild(p)
        main.appendChild(btn);

        // if(document.getElementById('remember').checked){}
        setExpireLocalTIme("token", auth.token, 2 * 24 * 60 * 60 * 1000)
    }
})

function setExpireLocalTIme(key, value, ttl) {
    let nowTime = new Date().getTime()
    let data = {
        value : value,
        expireTime : nowTime + ttl,
    }
    localStorage.setItem(key, JSON.stringify(data));
}

function getItemLocal(key){
    let data = localStorage.getItem(key);
    let nowTime = new Date().getTime();

    if(!data){
        return null;
    }

    data = JSON.parse(data);
    if(nowTime > data.expireTime){
        localStorage.removeItem(key);
        return null;
    }

    return data.value;

}