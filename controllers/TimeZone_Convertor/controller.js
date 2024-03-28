const connection = require("../../config/database");

exports.generateCountry = async (req,res)=>{
    let countrySQL = "select country_name from timezone_data group by country_name;"

    let [countryRES] = await connection.query(countrySQL);

    // console.log(countryRES);

    let country;
    country = `<option value="">--select Regioun--</option>`;
    for(let i = 0; i <countryRES.length; i++){
        country += `<option value="${countryRES[i]['country_name']}">${countryRES[i]['country_name']}</option>`
    }
    country += `</select></td>`;
    
    res.render('TimeZone_Convertor/timeZone', {country: country})
}

exports.cityRegioun = async (req,res)=>{
    let name = req.body.name;

    let citySql = `select city_name from timezone_data where country_name = "${name}";`
    let [cityRes] = await connection.query(citySql);
    let city = "";
    city += `<option value="">--select city--</option>`;    
    for(let i = 0; i <cityRes.length; i++){
        city += `<option value="${cityRes[i]['city_name']}">${cityRes[i]['city_name']}</option>`
    }
    city += `</select></td>`;

    return res.json({getCity : city});  
}

// exports.timezone = (req,res)=>{
//     let zone = req.body.timezone;
// }