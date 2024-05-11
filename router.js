const express = require('express')
const router = express.Router()

const controller = require('./controller/userController')

router.post('/create/user',controller.createUser)
router.post('/distribute',controller.distributeEarnings)
router.get('/users',controller.getUsers)

module.exports = router



