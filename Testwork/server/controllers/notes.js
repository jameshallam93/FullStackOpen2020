const notesRouter = require("express").Router()
const Note = require("../models/note.js")

notesRouter.get("/", (request, response) =>{
    Note.find({}).then(results =>{
        response.json(results)
    })
})

notesRouter.get("/:id", (request, response, next) =>{
    Note.findById(request.params.id).then(note =>{
        if (note){
            response.json(note)
        } else {
            response.status(400).end()
        }
    })
    .catch(error =>{
        next(error)
    })
})

notesRouter.post("/", (request, response, next) =>{
    const body = request.body

    const noteToSave = new Note( {
        content: body.content,
        date: new Date(),
        important: body.important || false
    })

    noteToSave.save().then(savedNote =>{
        response.json(savedNote)
    })
    .catch(error =>next(error))
})

notesRouter.put("/:id", (request, response, next) =>{
    const body = request.body
    const updatedNote = {
        content:body.content,
        important:body.important
    }


    Note.findByIdAndUpdate(request.params.id, updatedNote, {new: true})
        .then(note =>{
            response.json(note)
        })
        .catch(error =>{
            next(error)
        })    
})

notesRouter.delete("/:id", (request, response, next) =>{
    Note.findByIdAndDelete(request.params.id)
        .then(()=> 
            response.status(204).end())
        .catch(error => next(error))
})

module.exports = notesRouter