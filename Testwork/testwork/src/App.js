import React, { useState, useEffect }  from 'react'
import Note from './components/Note.js';
import Notification from "./components/Notification"
import noteService from "./services/notes"

const App = ({notes}) => {


  const [newNote, setNewNote] = useState(
    "a new note.."
  )  
  const [notez, setNotes] = useState([])
  
  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setMessage] = useState(null)


  useEffect(()=>{
    noteService.getAll()
    .then(initialNotes =>{
      setNotes(initialNotes)
    }
    )
  }
  ,[])
  
  const notesToShow = (showAll ?
    notez:
    notez.filter(note =>
      note.important === true))
    

  
  const addNote = (event) => {
    event.preventDefault()
    console.log("button pressed", event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important : Math.random() < 0.5,
    }
    noteService.create(noteObject)
    .then(returnedNote =>{
      setNotes(notez.concat(returnedNote))
    })

  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)

  }

  const toggleImportance = id =>{

    const note = notez.find(note => note.id === id)
    const newNote = {...note, important : !note.important}
    noteService.update(id, newNote)
    .then(returnedNote =>{
      setNotes(notez.map(note => note.id !== id ? note : returnedNote))
    }).then(console.log(`Note importance now set to ${note.important}`))
    .catch(error => {
      setMessage(`Error: ${error} : ${note.content} was already deleted`)
      setTimeout(() =>{setMessage(null)}, 5000)
      setNotes(notes.filter(n => n.id !== id))
  })
    
  }

  return(

    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <button onClick =
       {() => setShowAll(!showAll)}
       >Show {showAll ? "important" : "all" }
       </button>

      <ul>
        {notesToShow.map(note =>
          <Note note = {note} key = {note.id} toggleImportance = {() => toggleImportance(note.id)}/>
        )}
      </ul>

      <form onSubmit = {addNote}>
        <input value = {newNote}
        onChange = {handleNoteChange}>
        </input>
        <button type = "submit">save</button>
      </form>

    </div>
    )
}


  export default App