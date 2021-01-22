const bcrypt = require("bcrypt")
const User = require("../models/user")
const userRouter = require("express").Router()
const jwt = require("jsonwebtoken")


userRouter.post("/", async (request, response) =>{
    const body = await request.body

    const saltRounds = 10

    if (body.password.length < 3){
        response.status(401).json({error:"password must be at least 3 characters"})
    }else if(body.username.length < 3){
        response.status(401).json({error:"username must be at least 3 characters"})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const userToSave =  new User ({
        username:body.username,
        name:body.name,
        passwordHash
    })
    const result = await userToSave.save()

    response.json(result)

})

userRouter.get("/", async (request, response) =>{
    const body = request.body

    const users = await User.find({})

    response.status(200).json(users)
})

module.exports = userRouter