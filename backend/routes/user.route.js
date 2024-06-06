const express = require('express')
const router = express.Router()
const userController = require("../controllers/user.controller")

router.post('/register', userController.userRegister)

router.post('/login', userController.userLogin)

router.put('/:id', userController.updatePassword)

module.exports = router