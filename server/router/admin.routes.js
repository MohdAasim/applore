const express = require('express')
const router = express.Router()
const admin = require('../controllers/admincontent.controller')
const Authenticate = require('../middleware/Authenticate')

router.post('/api/addkid',Authenticate, admin.addKid)
router.post('/api/siginkid', admin.kidSignIn)
router.get('/getwriter',Authenticate ,admin.getKid)

module.exports = router