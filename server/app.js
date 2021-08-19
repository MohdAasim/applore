const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const adminRoute = require('./router/admin.routes.js')
const blogroutes = require('./router/blogs.routes')
const getblogs = require('./router/getblogs')
dotenv.config({path:'./config.env'})
require('./db/conn')


const PORT =process.env.PORT ||5000

//to understand the json data by our app
app.use(express.json())

//we are going to register the router here 
app.use(require('./router/auth'))
app.use(adminRoute)
app.use(blogroutes)
app.use(getblogs)


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})