const email = document.getElementById('email');
const verify = document.getElementById('verify');
const main = document.getElementById('main');

verify.addEventListener('click', async ()=>{
    let msg = await fetch('/forgotpass', {
        method: "POST",
        body: JSON.stringify({email: email.value}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    msg = await msg.json();

    if(msg.message){
        document.getElementById('err').innerHTML = msg.message;
    } else {
        main.innerHTML = "";

        const h2 = document.createElement('h2');
        h2.textContent = "Forgot Password";
        const p = document.createElement('p');
        p.textContent = "Your activation link is here...";
        const link = document.createElement('p');
        link.textContent = `Link: http://localhost:8000/repassword?email=${msg.email}&code=${msg.code}`;
        link.className = "link";

        main.appendChild(h2);
        main.appendChild(p);
        main.appendChild(link);
    }
})