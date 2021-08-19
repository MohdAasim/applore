const mongoose = require('mongoose')
const blogsSchema = mongoose.Schema({
    blogs:{
        type:String
    },
    email:{type:String},
    approve:{type:Boolean}
})
const Blog = mongoose.model('blogs', blogsSchema)
module.exports = Blog;