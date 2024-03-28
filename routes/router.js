const express = require('express');
const { getRegisterData, getVerification, authLogin, thankyou, logout, forgotPass, rePassword, updatePass } = require('../controllers/userControl');
const { authrate } = require('../middleware/authrenticate');
const { getForm, userTableData, user, userInformation } = require('../controllers/Express_Form_Practice/userController');
const { dataRetrive } = require('../controllers/MySQL_Grid/stdController');
const { pagination } = require('../controllers/Pagination/pageController');
const { attendence } = require('../controllers/Attendence_Record/attendence');
const { examRecord, reportCard } = require('../controllers/Exam_Record/examController');
const { searchData, dataRetrivebyID } = require('../controllers/Searching/searchbyID');
const { fieldData } = require('../controllers/Searching/searchbyfield');
const { DelimetersearchData, getData } = require('../controllers/Delimeter_Search/dataController');
const { getData2 } = require('../controllers/Delimeter_Search/dataController2');
const { mainForm } = require('../controllers/Job_Application_CRUD/mainForm');
const { validation } = require('../controllers/Job_Application_CRUD/validate');
const { updateForm } = require('../controllers/Job_Application_CRUD/update');
const { form } = require('../controllers/AJAX_Job_Application/generate');
const { ajaxvalidation } = require('../controllers/AJAX_Job_Application/validation');
const { showData } = require('../controllers/AJAX_Job_Application/showData');
const { ajaxupdateForm } = require('../controllers/AJAX_Job_Application/update');
const router =  express.Router();
const passport  = require('../config/passport');
const { query, page } = require('../controllers/Dynamic_Query/controllers');
const { main, getValue } = require('../controllers/Generate_Combo/dataController');


router.get('/', (req,res)=>{
    res.render('HomePage');
})


router.get('/register', (req,res)=>{
    res.render('RegistrationForm')
})


router.post('/register', getRegisterData);

router.get('/verify', getVerification);
router.get('/login', (req,res)=>{
    res.render('LoginPage')
}) 


router.post('/login', authLogin)

// router.get('/thankyou', thankyou);

// router.get('/userDetails', authrate, (req,res)=>{
//     res.render('userDetails', {data: req.user})
// })

router.get('/userDetails', passport.authenticate('jwt', {session:false, failureRedirect: "/"}), (req,res)=>{
    res.render('userDetails', {data: req.user})
})

router.get('/logout', logout)
router.get('/forgotpass', (req,res)=>{
    res.render('forgotPass')
})

router.post('/forgotpass', forgotPass);

router.get('/repassword', rePassword);

router.post('/repassword', updatePass);

router.get('/userDetails/dynamictable', authrate, (req,res)=>{
    res.render('Dynamic_Table/dynamicTable');
})

router.get('/userDetails/kukucube', authrate, (req,res)=>{
    res.render('KuKu_Cube/kukucube');
})

router.get('/userDetails/tictactoe', authrate, (req,res)=>{
    res.render('Tic_Tac_Toe/tictactoe');
})

router.get('/userDetails/sorting', authrate, (req,res)=>{
    res.render('Sorting_JavaScript/sorting');
})

router.get('/userDetails/mergesorting', authrate, (req,res)=>{
    res.render('Sorting_JavaScript/merge');
})

router.get('/userDetails/eventpractice', authrate, (req,res)=>{
    res.render('All_Event_Practice/eventpra');
})

router.get('/userDetails/form', authrate, getForm);
router.post('/userDetails/user', authrate, user);
router.get('/userDetails/user/table', authrate, userTableData);
router.get('/userDetails/details/:id', authrate, userInformation);

router.get('/userDetails/studentdata', authrate, dataRetrive);

router.get('/userDetails/count',authrate, pagination)

router.get('/userDetails/attendence',authrate, attendence)

router.get('/userDetails/examrecord', authrate, examRecord);
router.get('/userDetails/report', authrate, reportCard);

router.get('/userDetails/searching',authrate, searchData);
router.get('/userDetails/search', authrate, dataRetrivebyID);
router.get('/userDetails/data', authrate, fieldData);

router.get('/userDetails/delimetersearch', authrate, DelimetersearchData)
router.post('/userDetails/searchdata', authrate, getData)
// router.post('/userDetails/searchdata', getData2)
 
router.get('/userDetils/jobapplication', authrate, (req,res)=>{
    res.render('Job_Application_CRUD/jobApplicationForm')
});
router.get('/userDetails/validateMsg', authrate, (req,res)=>{
    res.send('Please Fill Required Field! OR Please Check emailID OR Please chaeck Phone Number');
})
router.get('/userDetails/generate', authrate, mainForm);
router.post('/userDetails/validate', authrate, validation);
router.get('/userDetails/updateForm', authrate, updateForm);

router.get('/userDetails/ajaxform', authrate, form);
router.post('/userDetails/ajaxvalidate', authrate, ajaxvalidation)
router.get('/userDetails/ajaxValidateMsg', authrate, (req,res)=>{
    res.send('Please Fill Required Field! OR Please Check emailID OR Please chaeck Phone Number');
})
router.get('/userDetails/welcome', authrate, showData);
router.get('/userDetails/update/:id', authrate, form);
router.get('/userDetails/getData/:id', authrate, ajaxupdateForm);

router.get('/userDetails/Ehya', authrate, (req,res)=>{
    res.render('Ehya_Demo/ehya')
})

router.get('/userDetails/HireX', authrate, (req,res)=>{
    res.render('HireX_Demo/HireX')
})

router.get('/userDetails/Awan', authrate, (req,res)=>{
    res.render('Awan_Demo/Awan')
})

router.get('/userDetails/query', authrate, query);
router.post('/userDetails/result', authrate, page);

router.get('/userDetails/maininput', authrate, main)
router.get('/userDetails/inputgenerate', authrate, getValue)
module.exports = router;