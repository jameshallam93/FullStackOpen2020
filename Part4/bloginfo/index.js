const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require("./models/blog")
const blogRouter = require("./controllers/blogs")
require("dotenv").config()



const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(console.log("successfully connected"))
.catch(error => {
    console.log(`Error connecting: ${error.message}`)
})

app.use(cors())
app.use(express.json())

app.use("/api/blogs/", blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})