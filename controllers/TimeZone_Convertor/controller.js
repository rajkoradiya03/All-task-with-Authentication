const logger = require("../../common/logger");
const connection = require("../../config/database");

exports.generateCountry = async (req,res)=>{
    try {
        let countrySQL = "select country_name from timezone_data group by country_name;"
    
        let [countryRES] = await connection.query(countrySQL);
    
    
        let country;
        country = `<option value="">--select Regioun--</option>`;
        for(let i = 0; i <countryRES.length; i++){
            country += `<option value="${countryRES[i]['country_name']}">${countryRES[i]['country_name']}</option>`
        }
        country += `</select></td>`;
        
        res.render('TimeZone_Convertor/timeZone', {country: country})
    } catch (error) {
        logger.error("Time zone exercise generateCountry function: "+error.message);
        res.send('Server Error!!!');
    }
}

exports.cityRegioun = async (req,res)=>{
    try {
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
    } catch (error) {
        logger.error("Time zone exercise cityRegion function: "+error.message);
        res.send('Server Error!!');
    }
}