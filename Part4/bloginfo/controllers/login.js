const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const logger = require("../utils/logger")
const { isUndefined } = require("lodash")


loginRouter.post("/", async (request, response) =>{
    const body = request.body


    const user = await User.findOne({username:body.username})
    console.log(`user is currently undefined: ${isUndefined(user)}`)
    logger.info(`user: ${user}`)
    logger.info(`passwordhash: ${user.passwordHash}`)
    const matchingPasswords = user === null ?
    false
    :
    await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && matchingPasswords)){
        return response
        .status(401)
        .json({error:"invalid username or password"})
    }
    const userForToken = {
        username: user.username,
        id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200)
    .send({token, username:user.username, name: user.name})
})

module.exports = loginRouter