const country = document.getElementById('country');

country.addEventListener('change', async ()=>{
    let name = country.value;

    let data = await fetch('/userDetails/generateCountry', {
        method:"POST",
        body: JSON.stringify({name: name}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    data = await data.json();

    let city = document.getElementById('city');
    city.innerHTML = data.getCity;
})

const city = document.getElementById('city');

city.addEventListener('change',async ()=>{
    let timezone = city.value;
    let INtime = document.getElementById('time');

    if(INtime.value === ""){
        let time = new Date().toLocaleTimeString('en-US', {timeZone:timezone});
    
        let CT = document.getElementById('convertTime');
    
        CT.innerHTML = "Convert Time: "+ time;
    } else {
        const convert = document.getElementById('convert');
        convert.addEventListener('click', ()=>{
            let millisecond = Number(INtime.value.split(':')[0]) * 60 * 60 * 1000 + Number(INtime.value.split(':')[1]) * 60 * 1000 + Number(INtime.value.split(':')[2]) * 1000;

            let date = new Date().toISOString().split('T')[0];
            // console.log(date);
            let newTime = new Date(date);

            newTime =  newTime.setMilliseconds(millisecond);

            let time = new Date(newTime).toLocaleTimeString('en-US', {timeZone:timezone});
            let CT = document.getElementById('convertTime');
    
            CT.innerHTML = "Convert Time: "+ time;
            // console.log(newTime);
        });
    }


})



