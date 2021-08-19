const express = require('express')
const router = express.Router()
const blogs = require('../controllers/blog.controller')
const Authenticate = require('../middleware/Authenticate')

router.post('/api/addblog', Authenticate, blogs.addBlog)
router.post('/updateblog', Authenticate, blogs.updateblog)
router.post('/deleteblog', Authenticate, blogs.deleteblog)
router.get('/getuserblog', Authenticate, blogs.getuserblog)

module.exports = router