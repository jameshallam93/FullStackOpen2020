import React, { useState, useEffect }  from 'react'
import Note from './components/Note.js';
import { nanoid } from 'nanoid'
import Axios from 'axios';


const App = ({notes}) => {


  const [newNote, setNewNote] = useState(
    "a new note.."
  )  
  const [notez, setNotes] = useState([])
  
  const [showAll, setShowAll] = useState(true)


  useEffect(()=>{
    Axios
    .get("http://localhost:3001/notes")
    .then(response =>{
      setNotes(response.data)
    }, []
    )
  }
  )

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
      id: nanoid()
    }
    setNotes(notez.concat(noteObject))
    setNewNote("")

  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)

  }

  return(

    <div>
      <h1>Notes</h1>

      <button onClick =
       {() => setShowAll(!showAll)}
       >Show {showAll ? "important" : "all" }
       </button>

      <ul>
        {notesToShow.map(note =>
          <Note note = {note} key = {note.id}/>
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