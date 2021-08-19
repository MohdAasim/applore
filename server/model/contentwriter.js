const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const kidSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: Number,
        maxLength: 10,
        minLength: 10
    },
    blogs: [{
        type: String
    }],
    token: [{
        token: {
            type: String,
            required: true
        }
    }]
})

kidSchema.methods.generateAuthToken = async function () {
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

const kid = mongoose.model('kid', kidSchema)
module.exports = kid;