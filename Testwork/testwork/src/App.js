import React, { useState, useEffect }  from 'react'
import Note from './components/Note.js';
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import LoginDisplay from "./components/LoginDisplay"
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

  const [loginVisible, setLoginVisible] = useState(false)

  const [loggedIn, setLoggedin] = useState(false)


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
      setLoggedin(true)
    }
    
  },[])
  
  const notesToShow = (showAll ?
    notez
    :
    notez.filter(note =>
      note.important === true))
    

  
  const addNote = (event) => {
    event.preventDefault()

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
  const resetUsernameAndPassword = () =>{
    setUsername("")
    setPassword("")
  }

  const handleLogin = async event => {

    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      console.log(`user from handleLogin ${user}`);
      

      //state, then token, then browser
      setNewUser(user)
      noteService.setNewToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setLoggedin(true)
      resetUsernameAndPassword()

    }catch(exception){
      console.log(exception)
      setMessage("Error: Wrong Credentials")

      resetUsernameAndPassword()

      setTimeout(()=>{
        setMessage(null)
      }, 5000)
    }
  }
  const toggleLoginForm = () =>{
    setLoginVisible(!loginVisible)

  }
  const handleLogout = (event) =>{
    event.preventDefault()
    setUsername(null)
    window.localStorage.removeItem("loggedUser")
    noteService.setNewToken(null)
    setLoggedin(false)
    setLoginVisible(false)

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

  const handleUsernameChange = (target) =>{
    setUsername(target.value)
  }
  const handlePasswordChange = (target) =>{
    setPassword(target.value)
  }


  const noteForm = () =>(
    <form onSubmit = {addNote}>
      <input value = {newNote}
      onChange = {handleNoteChange}>
      </input>
      <button type = "submit">save</button>
    </form>
  )


  const showWhenLoggedIn = {display: loggedIn ? "":"none"}
  const hideWhenLoggedIn = {display: loggedIn ? "none": ""}
  return(

    <div>
      {user === null ?
        <div style = {hideWhenLoggedIn}>
        <LoginForm handleLogin = {handleLogin}
        username = {username}
        password = {password}
        handleUsernameChange = {handleUsernameChange}
        handlePasswordChange = {handlePasswordChange}
        loginVisible = {loginVisible}
        toggleLoginForm = {toggleLoginForm} />
        </div>
        :
        <div style = {showWhenLoggedIn}>

          <p>{user.name} logged in </p>
          <button onClick = {handleLogout}>
            Logout
          </button>
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
          <Note note = {note}
          key = {note.id}
          handleDelete = {() =>handleDelete(note.id)}
          toggleImportance = {() => toggleImportance(note.id)}/>
        )}
      </ul>



    </div>
    )
}


  export default App