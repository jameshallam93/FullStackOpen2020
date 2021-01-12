const Note = require("../models/note")

const notes = [
    {
        content:"HTML is easy",
        date: new Date(),
        important: false
    },
    {
        content: "Browser can only execute javascript",
        date: new Date(),
        important: true
    }
]

const nonExistingId = async () =>{
    const note = {
        content:"should be auto removed",
        date: new Date()
    }
    await note.save()
    await note.remove()

    return note._id.toString()
    
}

const notesFromDb = async () =>{
    const notesFromDb = await Note.find({})
    return notesFromDb.map(note =>
        note.toJSON()
    )
}

module.exports = {
    notesFromDb, notes, nonExistingId
}