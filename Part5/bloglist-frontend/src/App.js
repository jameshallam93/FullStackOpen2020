import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import loginService from "./services/login"
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //below three for creation of new blogs
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  //for login form
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  //two strings, one defining the type of notification ("Error"/"Message") and one with the message contents; allows for color coded response boxes
  //set as null, null for conditional rendering of notification message
  const [notification, setNotification] = useState([null,null])


  const timeoutNotification = (message, time) =>{
    setNotification(message)
    setTimeout(()=>{
      setNotification([null,null])
    }, time)
  }
//check to see if user has a valid session open
  useEffect(() =>{
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    if (user){
      setUser(user)
      blogService.setToken(user.token)
      timeoutNotification(["Message",`Welcome back ${user.name}`],3000)
    }
  },[])
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const clearLoginBox = () =>{
    setUsername("")
    setPassword("")
  }

  const handleLogin = async event =>{
    event.preventDefault()
    try{
    const user = await loginService.login({username, password})
      //set user state, token and local storage variable
    setUser(user)
    blogService.setToken(user.token)
    window.localStorage.setItem("loggedUser", JSON.stringify(user))

    clearLoginBox()
    timeoutNotification(["Message",`${user.username} logged in successfully`], 2500)
  
    }
    catch (exception){
      console.log(exception)
      clearLoginBox()
      timeoutNotification(["Error","Error: Login failed - please try again"], 2500)
    }
  }
  

  const handleLogout = async event =>{
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem("loggedUser")
    blogService.setToken("")
    timeoutNotification(["Message","User has logged out"], 3000)
  }

  const clearNewBlogBox = () =>{
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const saveBlog = async () =>{
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const result = await blogService.create(newBlog)
    return result
  }
  
  const handleNewBlog = async event =>{
    event.preventDefault()
    try{
      const result = await saveBlog()
      timeoutNotification(["Message",`New blog, ${result.title}, has been saved`], 2500)

      const returnedBlogs = await blogService.getAll()

      setBlogs(returnedBlogs)
      clearNewBlogBox()

    }catch(exception){
      timeoutNotification(["Error", exception], 3000)
      clearNewBlogBox()
    }
  }

  
  const uniStyle = {
    background:"lightGrey"
  }


  return (
    <div style = {uniStyle}>
      <Notification message = {notification} />

      {user === null ?
      <>
       <LoginForm 
         usernameState = {username}
         passwordState = {password}
       
         usernameFunction =  {setUsername}
         passwordFunction = {setPassword}
       
          onSubmit = {handleLogin}
       />
      </>
      :
      <>
      <div>
        <BlogForm 
          titleState = {title}
          authorState = {author}
          urlState = {url}

          setTitle = {setTitle}
          setAuthor = {setAuthor}
          setUrl = {setUrl}

          onSubmit = {handleNewBlog} 
          />

      </div>
      <div>
        <>
          {`${JSON.stringify(user.name)} is logged in`}
          <button
            type = "submit"
            onClick = {handleLogout}>
              Logout
          </button>
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