require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const Note = require("./models/note")


app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(morgan("tiny"))


app.post("/api/notes", (request, response) =>{
    const body = request.body

    if (body.content === undefined){
        return response.status(400).json({
            error: "Content missing"
        })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    note.save().then(savedNote =>{
        response.json(savedNote)
    })
})


app.get("/", (request, response) =>{
    response.send("<h1>This page is not in use</h1>")
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes =>{
        response.json(notes)
    }
)})

app.get("/api/notes/:id", (request, response) =>{

    Note.findById(request.params.id).then(note =>{
        if (note){
            response.json(note)
        }else{
            response.status(400).end()
        }
    })
    .catch(error =>{
        console.log(error)
        response.status(400).send({error: "malformatted ID"})
    })

})

app.delete("/api/notes/:id", (request, response) =>{
    Note.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
})
app.put("/api/notes/:id", (request, response) =>{
    const body = request.body

    const note = {
        content: body.content,
        important:body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, {new:true})
    .then(updatedNote =>{
        response.json(updatedNote)
    })
})


const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`Server running on port number ${PORT}`)
})
console.log(`Server running on port ${PORT}`)