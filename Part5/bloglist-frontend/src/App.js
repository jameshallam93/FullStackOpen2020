import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import NewUserForm from "./components/NewUserForm"
import loginService from "./services/login"
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  //two strings, one defining the type of notification ("Error"/"Message") and one with the message contents; allows for color coded response boxes
  //initially set as null, null for conditional rendering of notification message
  const [notification, setNotification] = useState([null,null])


//displays given message to the screen for given time (ms)
  const timeoutNotification = (message, time) =>{
    setNotification(message)
    setTimeout(()=>{
      setNotification([null,null])
    }, time)
  }
//collects blogs from db, sorts by number of likes then updates blogs state to render to page
  const updateBlogs = async () =>{
    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((a,b) =>
    b.likes - a.likes)
     setBlogs(updatedBlogs)
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
  //get all blogs and display to page
  useEffect(() => {
    updateBlogs()
  }, [])


  const handleLogin = async (username, password) =>{

    try{
      const user = await loginService.login({username, password})
        //set user state, token and local storage variable
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      timeoutNotification(["Message",`${user.username} logged in successfully`], 2500)
    }
    catch (exception){
      console.log(exception)
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



  const saveBlog = async (blog) =>{
    const result = await blogService.create(blog)
    return result
  }

  const handleNewBlog = async (event, blog) =>{
    event.preventDefault()
    try{
      const result = await saveBlog(blog)
      timeoutNotification(["Message",`New blog, ${result.title}, has been saved`], 2500)

      const returnedBlogs = await blogService.getAll()

      setBlogs(returnedBlogs)

    }catch(exception){
      timeoutNotification(["Error", exception], 3000)
    }
  }

  //refactor
  const uniStyle = {
    background:"AliceBlue"
  }
  const bannerStyle = {
    border:"solid",
    borderWidth:5,
    borderColor:"blue",
    color:"white",
    font: "raleway",
    background:"blue"
  }


  return (
    <div style = {uniStyle}>
      <h1 style = {bannerStyle}>Hallams Blogs</h1>
      <Notification message = {notification} />

      {user === null ?
      <>
      <Togglable buttonLabel = {"Login"}>

       <LoginForm
          handleLogin = {handleLogin}
       />
      </Togglable>
      <Togglable buttonLabel = {"New user"}>

        <NewUserForm notification = {timeoutNotification}/>

      </Togglable>
      </>
      
      :
      
      <>
      <div>
        <Togglable buttonLabel = {"Create blog"}>
          <BlogForm
            handleNewBlog = {handleNewBlog} />
        </Togglable>
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
        <h2 style = {{textDecoration:"underline"}}>Blogs:</h2>
        {blogs.map(blog =>
          <Blog
          key = {blog.id}
          blog={blog}
          updateBlogs = {updateBlogs}
          notification = {timeoutNotification} />
        )}
      </div>
      </>
      }

    </div>
  )
}

export default App