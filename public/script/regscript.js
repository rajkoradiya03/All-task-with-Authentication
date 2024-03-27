const regbtn = document.getElementById('register');
const active = document.getElementById('active');
let fname = document.getElementById('firstName');
let lname = document.getElementById('lastName');
let email = document.getElementById('email');
let username = document.getElementById('Username');
let password = document.getElementById('password');
let cpassword = document.getElementById('confirmpassword');
let textOnlyeregx = /^[a-zA-Z]*$/;
let emailregx = /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})*$/;
let smalltextregx = /^[a-z0-9]*$/;
let msg = document.getElementsByClassName('msg');
let main = document.getElementById('main');
// if(getItemLocal('token')){
//     window.location = '/userDetails'
// }
regbtn.addEventListener('click', async ()=>{
    let isvalid = true;
    
    if(!textOnlyeregx.test(fname.value)){
        msg[0].innerHTML = "First Name in only text."
        isvalid = false;
    } else {
        msg[0].innerHTML = ""
    }

    if(!textOnlyeregx.test(lname.value)){
        msg[1].innerHTML = "Last Name in only text."
        isvalid = false;
    } else {
        msg[1].innerHTML = ""
    }

    if(!emailregx.test(email.value)){
        msg[2].innerHTML = "Invalid Email."
        isvalid = false;
    } else {
        msg[2].innerHTML = ""
    }

    if(!smalltextregx.test(username.value)){
        msg[3].innerHTML = "Username should be small text."
        isvalid = false;
    } else {
        msg[3].innerHTML = ""
    }

    if(isvalid == true){
        let registerData = {
            firstName: fname.value,
            lastName: lname.value,
            email: email.value,
            username: username.value,
            password: password.value,
            confirmpassword: cpassword.value
        };
        // console.log(registerData);
        let data = await fetch('/register', {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(registerData),
        })  

        data = await data.json();
        // console.log(data);

        if(data.errMessage){
            document.getElementById('err').innerHTML = data.errMessage;
        } else {
            document.getElementById('err').innerHTML = "";
            // active.innerHTML = data.message;
            // active.href = `/thankyou?email=${data.email}&code=${data.code}`;
            main.innerHTML = "";
            main.style.height = "350px";
            const h2 = document.createElement('h2');
            h2.textContent = "Thank You for registraion...";
            const p = document.createElement('p');
            p.textContent = "Your activation link is here...";
            const link = document.createElement('p');
            link.textContent = `Link: http://localhost:8000/verify?email=${data.email}&code=${data.code}`;
            link.className = "link";

            main.appendChild(h2);
            main.appendChild(p);
            main.appendChild(link);
        }
    }
})

// function getItemLocal(key){
//     let data = localStorage.getItem(key);
//     let nowTime = new Date().getTime();

//     if(!data){
//         return null;
//     }

//     data = JSON.parse(data);

//     if(nowTime > data.expireTime){
//         localStorage.removeItem(key);
//         return null;
//     }

//     // console.log(data.value);
//     return data.value;

// }