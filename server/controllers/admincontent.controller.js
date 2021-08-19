const Kid = require('../model/contentwriter')
// const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const debugJwt = require('../misc/getemailusingJWT')


exports.addKid = async (req, res) => {
	const {
		name,
		email,
		password,
		phoneNumber
	} = req.body
	if (!name || !email || !phoneNumber || !password) {
		return res.status(422).json({
			error: "please enter all the field"
		})
	}
	try {
		const userExist = await Kid.findOne({
			email: email
		})
		if (userExist) {
			return res.status(422).json({
				error: "Email already exist"
			})
		} else {
			const kid = new Kid({
				name,
				email,
				phoneNumber,
				password
			})
			//bcrypt middleware used here
			await kid.save()
			res.status(201).json({
				message: "User Registered"
			})
		}
	} catch (err) {
		console.log(err)
	}

}

exports.kidSignIn = async (req, res) => {
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
		const usremail = await Kid.findOne({
			email: email
		})
		if (usremail) {

			const token = await usremail.generateAuthToken()
			res.cookie('jwttoken', token, {
				expires: new Date(Date.now() + 25872000000),
				httpOnly: true
			})
			res.json({
				message: 'user SignIn successfully'
			})

		} else {
			res.status(400).json({
				error: 'user error'
			})
		}
	} catch (err) {
		console.log(err)
	}
}


exports.getKid = async (req, res) => {
	const token = req.headers.cookie.split('=')[1]
	const emailOfParent = debugJwt(token).email
	try {
		const response = await Kid.find()
		if (res) {
			res.send(response)
		}
	} catch (err) {
		console.log(err)
	}
}