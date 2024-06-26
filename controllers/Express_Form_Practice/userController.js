const fs = require('node:fs');
const logger = require('../../common/logger');
exports.getForm = (req,res)=> {
    res.render('Express_Form_Practice/Form') 
}



exports.user = (req,res)=> {
    try {
        let userData = req.body;
        if(userData.fname === ""){
            res.send("First name Field is Empty!!");
        }
        else if(userData.lname === ""){
            res.send("Last name Field is Empty!!");
        }
        else if(parseInt(userData.age) === NaN || parseInt(userData.age) < 18){
            res.send("Age 18 or Above is valid");
        }
        else if(parseInt(userData.number) === NaN || (userData.number).length < 10){
            res.send("Number length is less than 10 digit")
        }
        else if(!(userData.email).includes("@")){
            res.send("Enter valid Email");
        }
        else if(!userData.gender){
            res.send("Select gender")
        }
        else if(userData.hobbies === undefined){
            res.send("Select Hobbies");
        }
        else{
            userData.id = crypto.randomUUID();
            var readFile = JSON.parse(fs.readFileSync('user.json').toString());
            readFile.push(userData);
            fs.writeFileSync('user.json', JSON.stringify(readFile));
            res.redirect('/userDetails/form');
        }
    } catch (error) {
        logger.error("Express form Exersice user function: "+ error.message)
    }
}

exports.userTableData = (req,res)=> {
    try {
        var readFile = JSON.parse(fs.readFileSync('user.json').toString());
        res.render('Express_Form_Practice/userTable',{
            data: readFile
        });
    } catch (error) {
        logger.error("Express form Exersice userTableData function: "+ error.message)
    }
}


exports.userInformation = (req,res)=> {
    try {
        var readFile = JSON.parse(fs.readFileSync('user.json').toString());
        let uid = [];
        for(let i = 0; i < readFile.length; i++){
            uid.push({"id":readFile[i].id});
        }
        res.render('Express_Form_Practice/userDetails',{
            data: readFile,
            id: req.params.id
        });
    } catch (error) {
        logger.error("Express form Exersice userInformation function: "+ error.message)
    }
}
