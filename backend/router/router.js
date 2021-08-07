const express = require('express')
const router = express.Router() ;
const {register,login} = require('../controllers/auth.controller')
const {users , messages} = require('../controllers/select.controller')

router.post('/register' , register)
router.post('/login' , login)
router.get('/users' , users)
router.get('/messages' , messages)

module.exports = router ; 