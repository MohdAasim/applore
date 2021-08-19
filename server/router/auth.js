const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
const bcryptjs = require('bcryptjs')

require('../db/conn')
//signup
router.post('/adminregister', async (req, res) => {

    const {
        name,
        email,
        phoneNumber,
        password,
        cpassword
    } = req.body;
    if (!name || !email || !phoneNumber || !password || !cpassword) {
        return res.status(422).json({
            error: "please enter all the field"
        })
    }
    try {
        const userExist = await User.findOne({
            email: email
        })
        if (userExist) {
            return res.status(422).json({
                error: "Email already exist"
            })
        } else if (password != cpassword) {
            return res.status(422).json({
                error: "Email already exist"
            })
        } else {
            const user = new User({
                name,
                email,
                phoneNumber,
                password,
                cpassword
            })
            //bcrypt middleware used here
            await user.save()
            res.status(201).json({
                message: "User Registered"
            })
        }
    } catch (err) {
        console.log(err)
    }

})
//signIn
router.post('/adminsignIn', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            error: "please enter all the field"
        })
    }
    try {
        const usremail = await User.findOne({
            email: email
        })
        if (usremail) {
            const isMatch = await bcryptjs.compare(password, usremail.password)
            const token = await usremail.generateAuthToken();
            res.cookie('jwttoken', token, {
                expires: new Date(Date.now() + 25872000000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({
                    error: 'user error'
                })
            } else {
                res.json({
                    message: 'user SignIn successfully'
                })
            }
        } else {
            res.status(400).json({
                error: 'user error'
            })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router