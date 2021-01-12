const notesRouter = require("express").Router()
const Note = require("../models/note.js")

notesRouter.get("/", async (request, response)=>{
    const notes = await Note.find({})

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

notesRouter.post("/", async (request, response, next) =>{
    const body = request.body

    const noteToSave = new Note( 
        {
        content: body.content,
        date: new Date(),
        important: body.important || false
        }
    )

    const savedNote = await noteToSave.save()
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
    await Note.findByIdAndDelete(request.params.id)
        
    response.status(204).end()
})

module.exports = notesRouter