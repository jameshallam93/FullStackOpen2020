import React, { useState, useEffect }  from 'react'
import Note from './components/Note.js';
import Notification from "./components/Notification"
import noteService from "./services/notes"
import loginService from "./services/login"

const App = ({notes}) => {


  const [newNote, setNewNote] = useState("a new note..")  

  const [notez, setNotes] = useState([])
  
  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setMessage] = useState(null)

  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")

  const [user, setNewUser] = useState(null)



  useEffect(()=>{
    noteService.getAll()
      .then(initialNotes =>{
        setNotes(initialNotes)
      }
    )
  }
  ,[])

  useEffect(() =>{
    const userJSON = window.localStorage.getItem("loggedUser")

    if (userJSON){
      const user = JSON.parse(userJSON)
      setNewUser(user)
      noteService.setNewToken(user.token)
    }
    
  },[])
  
  const notesToShow = (showAll ?
    notez
    :
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
    setNewNote("")

  }

  const handleLogin = async event => {

    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      console.log(`user: ${user}`);
      //state, then token, then browser
      setNewUser(user)
      noteService.setNewToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      setPassword("")
      setUsername("")

    }catch(exception){
      console.log(exception)
      setMessage("Error: Wrong Credentials")

      setUsername("")
      setPassword("")

      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    }
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)

  }
  const handleDelete = id =>{

    const response = noteService.remove(id)
    console.log(`response: ${JSON.stringify(response)}`);
    
    setNotes(notez.filter(note => note.id !== id))
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
      setNotes(notez.filter(n => n.id !== id))
  })}
  
  const loginForm = () => (
    <form onSubmit = {handleLogin}>
        <div>
          Username
          <input
          type = "text"
          value = {username}
          onChange = {({target}) => setUsername(target.value)}
          name = "Username">
          </input>
        </div>
        <div>
          Password
          <input
          type = "text"
          value = {password}
          name = "Password"
          onChange = {({target}) => setPassword(target.value)}>
          </input>
        </div>
        <button type = "submit">login</button>
      </form>
  )

  const noteForm = () =>(
    <form onSubmit = {addNote}>
      <input value = {newNote}
      onChange = {handleNoteChange}>
      </input>
      <button type = "submit">save</button>
    </form>
  )

  return(

    <div>
      {user === null ?
        loginForm()
        :
        <div>
          <p>{user.name} logged in </p>
          {noteForm()}
        </div>
      }
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <button onClick =
       {() => setShowAll(!showAll)}
       >Show {showAll ? "important" : "all" }
       </button>

      <ul>
        {notesToShow.map(note =>
          <Note note = {note} key = {note.id} handleDelete = {() =>handleDelete(note.id)} toggleImportance = {() => toggleImportance(note.id)}/>
        )}
      </ul>



    </div>
    )
}


  export default App