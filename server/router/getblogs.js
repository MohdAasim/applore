const express = require('express')
const router = express.Router()
const Blogs = require('../model/blogsmodel')

router.get('/getblogs', async (req, res) => {
    try {
        const approve = await Blogs.find({
            approve: true
        })
        res.send(approve)
    } catch (err) {
        res.send(err)
    }
})

router.get('/getallblogs', async (req, res) => {
    try {
        const approve = await Blogs.find()
        res.send(approve)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router