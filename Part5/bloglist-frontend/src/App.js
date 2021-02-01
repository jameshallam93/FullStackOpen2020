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
  //below three for creation of new blogs ***REFACTOR***
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  //for login form ***REFACTOR***
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  //two strings, one defining the type of notification ("Error"/"Message") and one with the message contents; allows for color coded response boxes
  //initially set as null, null for conditional rendering of notification message
  const [notification, setNotification] = useState([null,null])
  //***REFACTOR***
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogformVisible, setBlogformVisible] = useState(false)


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
    const newBlog = blogService.generateBlog(title, author, url)
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
         loginVisible = {loginVisible}
         setLoginVisible = {setLoginVisible}

         usernameState = {username}
         passwordState = {password}
       
         usernameFunction =  {setUsername}
         passwordFunction = {setPassword}
       
          onSubmit = {handleLogin}
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
            visible = {blogformVisible}
            setVisible = {setBlogformVisible} 

            titleState = {title}
            authorState = {author}
            urlState = {url}

            setTitle = {setTitle}
            setAuthor = {setAuthor}
            setUrl = {setUrl}

            onSubmit = {handleNewBlog} 
            />
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
          <Blog key={blog.id}
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