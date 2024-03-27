const express = require('express');
const { getRegisterData, getVerification, authLogin, thankyou, logout, forgotPass, rePassword, updatePass } = require('../controllers/userControl');
const { authrate } = require('../middleware/authrenticate');
const { getForm, userTableData, user, userInformation } = require('../controllers/Express_Form_Practice/userController');
const { dataRetrive } = require('../controllers/MySQL_Grid/stdController');
const { pagination } = require('../controllers/Pagination/pageController');
const { attendence } = require('../controllers/Attendence_Record/attendence');
const { examRecord, reportCard } = require('../controllers/Exam_Record/examController');
const router =  express.Router();


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

router.get('/userDetails', authrate, (req,res)=>{
    res.render('userDetails', {data: req.user})
})

// router.get('/userDetails', passport.authenticate('jwt', {session:false}), (req,res)=>{
//     res.render('userDetails', {data: payload})
// })

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

router.get('/userDetails/search',)

module.exports = router;