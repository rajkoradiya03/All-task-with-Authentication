const state = document.getElementById('state')

console.log(state);

state.addEventListener('change', async ()=>{
    let stateID = state.value;

    console.log(stateID);

    let data = await fetch('http://localhost:8080/', {
        method:"POST",
        body: JSON.stringify({stateID : stateID}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    data = await data.json();

    let city = document.getElementById('city');
    city.innerHTML = data.getCity;
})