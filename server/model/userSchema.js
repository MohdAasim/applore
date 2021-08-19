const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    kids: [{
        type: String
    }],
    token: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({
            email: this.email
        }, process.env.SECRETKEY)
        this.token = this.token.concat({
            token: token
        })
        await this.save()
        return token
    } catch (err) {
        console.log(err)
    }
}
//middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

const User = mongoose.model('USER', userSchema)
module.exports = User;