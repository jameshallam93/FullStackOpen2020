import React, { useState } from "react"

const NoteForm = ({ createNote }) =>{
    const [newNote, setNewNote] = useState("")  

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    
    }
    const addNote = (event) => {
        event.preventDefault()
    
        const noteObject = {
          content: newNote,
          date: new Date().toISOString(),
          important : Math.random() < 0.5,
        }
        createNote(noteObject)
        setNewNote("")
      }
    return(
        <div className = {"formDiv"}>
            <h2>Create a new note</h2>
            <form onSubmit = {addNote}>
                <input value = {newNote}
                onChange = {handleNoteChange}>
                </input>
                <button type = "submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm




