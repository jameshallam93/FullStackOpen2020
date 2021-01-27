import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState("Test notification")

  useEffect(() =>{
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    if (user){
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    setNotification("All blogs loaded")
    setTimeout(()=>{
      setNotification(null)
    }, 5000)
  }, [])
  const clearLoginBox = () =>{
    setUsername("")
    setPassword("")
  }

  const handleLogin = async event =>{
    event.preventDefault()
    try{
    const user = await loginService.login({username, password})
  
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    clearLoginBox()
  
    }catch (exception){
      console.log(exception)
      clearLoginBox()
    }
  }
  

  const handleLogout = async event =>{
    event.preventDefault()
    console.log(`${user.username} has logged out`);
    setUser(null)
    window.localStorage.removeItem("loggedUser")
  }

  const clearNewBlogBox = () =>{
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const handleNewBlog = async event =>{
    event.preventDefault()
    try{
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const result = await blogService.create(newBlog)
      console.log(`result from handle new blog: ${result}`)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      clearNewBlogBox()

    }catch(exception){
      console.log(exception)
      clearNewBlogBox()
    }
  }
  const loginForm = () =>(
    <form>
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
    </form>
)

const newBlogForm = (event) =>(
  <>
  <div>
  title:
      <input type = "text"
      name = "title"
      value = {title}
      onChange = {({target}) => setTitle(target.value)}
      ></input>
  </div>
  <div>
  author:
    <input type = "text"
    name = "author"
    value = {author}
    onChange = {({target}) =>setAuthor(target.value)}
    />

  </div>
  <div>
  url:
    <input type = "text"
    name = "url"
    value = {url}
    onChange = {({target}) =>setUrl(target.value)}
    />
  </div>
  <button type = "submit"
  onClick = {handleNewBlog}>
    create
  </button>
  </>
)


  return (
    <div>

      <Notification message = {notification} />
      
      {user === null ?
       loginForm()
      :
      <>
      <div>
        {newBlogForm()}
      </div>
      <div>
       <>{`${JSON.stringify(user.name)} is logged in`}
       <button type = "submit" onClick = {handleLogout}>Logout</button>
       </>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      </>
      }
    </div>
  )
}

export default App