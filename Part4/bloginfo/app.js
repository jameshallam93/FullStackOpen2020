const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require("express-async-errors")
const middleware = require("./utils/middleware")
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const config = require("./utils/config")
const logger = require("./utils/logger")




mongoose.connect(config.MONGO_DB_URL, {useFindAndModify:false, useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true})
  .then(() => {
    logger.info('connected to MongoDB')
  })

app.use(cors())
app.use(express.json())
app.use(middleware.getToken)
app.use(middleware.requestLogger)

app.use("/api/users", userRouter)
app.use("/api/blogs", blogRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)



module.exports = app