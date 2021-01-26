import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import LoginForm from "./components/loginForm"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)


  const loginForm = () =>(
    <div>
        <h2>login</h2>
        username
        <div>
          <input type = "text"
          value = {username}
          name = "username"
          onChange = {({target})=>{setUsername(target.value)}}>
          </input>
        </div>
        password
        <div>
          <input type = "text"
          value = {password}
          name = "password"
          onChange = {({target}) =>{setPassword(target.value)}}>
          </input>
        </div>
        <button type = "submit"
        onClick = {handleLogin}>
            login
        </button>
    </div>
)

const handleLogin = async event =>{
  event.preventDefault()
  try{
  const user = await loginService.login({username, password})

  setUser(user)

  setUsername("")
  setPassword("")


  }catch (exception){
    console.log(exception)


    setUsername("")
    setPassword("")


  }
}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {user === null ?
       loginForm()
      :
      <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
      }



    </div>
  )
}

export default App