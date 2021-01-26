const notesRouter = require("express").Router()
const Note = require("../models/note.js")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

notesRouter.get("/", async (request, response)=>{
    const notes = await Note.find({})
        .populate("user", {username: 1, name: 1})
    response.json(notes)
})

notesRouter.get("/:id", async (request, response, next) =>{
    const note = await Note.findById(request.params.id)
        if (note){
            response.json(note)
        } else {
            response.status(400).end()
        }
})

const getToken = request =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

notesRouter.post("/", async (request, response, next) =>{
    const body = request.body
    const token = getToken(request)
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!(token || decodedToken.id)){
        response
        .status(401)
        .json({error:"token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)

    console.log(`user: ${user}`)
    const noteToSave = new Note( 
        {
        content: body.content,
        date: new Date(),
        important: body.important || false,
        user: user._id  
        }   
    )

    const savedNote = await noteToSave.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
        response.json(savedNote)

})

notesRouter.put("/:id", async (request, response, next) =>{
    const body = request.body

    const updatedNote = 
    {
        content:body.content,
        important:body.important
    }

    const returnedNote = await Note.findByIdAndUpdate(request.params.id, updatedNote, {new: true})
    response.json(returnedNote)
})

notesRouter.delete("/:id", async (request, response, next) =>{
    const token = getToken(request)
    console.log(`token from notesRouter delete ${token}`);
    
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!(token || decodedToken.id)){
        return response
            .status(401)
            .json({error:"missing or invalid token"})
    }

    const noteToDelete = await Note.findById(request.params.id)

    if ((decodedToken.id.toString()) !==(noteToDelete.user.toString())){
        response
            .status(401)
            .json({error:"Only notes author can delete it"})
    }

    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = notesRouter