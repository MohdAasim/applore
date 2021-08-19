const jwt = require('jsonwebtoken')
const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)

        next()
    } catch (err) {
        console.log(err)
    }
}
module.exports = Authenticate;