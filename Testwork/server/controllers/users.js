const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = await request.body

  const saltRounds = 10
  if (body.password.length < 8){
    response.status(400).json({error:"password must be 8 characters or more"})
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  
  
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(200).json(savedUser)
})

userRouter.get("/", async (request, response) =>{
  const users = await User.find({})

  response.json(users)
})

module.exports = userRouter