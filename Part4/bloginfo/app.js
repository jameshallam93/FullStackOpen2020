const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require("./utils/middleware")
const blogRouter = require("./controllers/blogs")
const config = require("./utils/config")

const mongoUrl = config.MONGO_DB_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(console.log("successfully connected"))
.catch(error => {
    console.log(`Error connecting: ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use("/api/blogs/", blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app