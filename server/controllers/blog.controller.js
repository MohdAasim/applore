const Blog = require('../model/blogsmodel')
const debugJwt = require('../misc/getemailusingJWT')

exports.addBlog = async (req, res) => {
    const {
        blogs
    } = req.body
    //email is getting by the user email
    const token = req.headers.cookie.split('=')[1]
    const emailOfParent = debugJwt(token).email
    if (!blogs) {
        return res.status(422).json({
            error: "please enter all the field"
        })
    }
    try {
        const blog = new Blog({
            blogs,
            email: emailOfParent
        })
        await blog.save()
        res.status(201).json({
            message: "User Registered"
        })
    } catch (err) {
        console.log(err)
    }
}

exports.updateblog = async (req, res) => {
    const {
        id,
        blogs,
        approve
    } = req.body
    try {
        if (blogs) {
            const response = await Blog.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    blogs: blogs,
                }
            }, {
                useFindAndModify: false,
                new: true
            })
            res.send(response)
        } else {
            const response = await Blog.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    approve: approve
                }
            }, {
                useFindAndModify: false,
                new: true
            })
            res.send(response)
        }
    } catch (err) {
        console.log(err)
    }
}
exports.deleteblog = async (req, res) => {
    const {
        id
    } = req.body
    try {
        const response = await Blog.findByIdAndDelete({
            _id: id
        })
        res.send(response)
    } catch (e) {
        console.log(e)
    }
}

exports.getuserblog = async (req, res) => {
    const token = req.headers.cookie.split('=')[1]
    const emailOfParent = debugJwt(token).email
    try {
        const approve = await Blog.find({
            email: emailOfParent
        })
        res.send(approve)
    } catch (err) {
        res.send(err)
    }
}