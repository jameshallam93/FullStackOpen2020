import React from 'react'
import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlogs, notification }) => {

  const [showHidden, setShowHidden] = useState(false)
  
  const incrementLikes = async () =>{
    blog.likes = blog.likes + 1
    await blogService.update(blog)
    //below is an easy way to update hidden info without rerendering whole page - closes hidden info box and reopens with correct info
    setShowHidden(false)
    setShowHidden(true)
  }

  const handleDelete = async () =>{
    try{
      if (window.confirm(`Are you sure you want to remove ${blog.title}?`)){
        await blogService.remove(blog)
        updateBlogs()
        notification(["Message", "Blog successfully deleted"], 3000)
      }
    }catch(exception){
      notification(["Error", "Only the blogs creator may delete it"], 3000)
  }
}

  const blogStyle = {borderStyle:"groove",
  paddingTop: 10,
  paddingLeft: 2,
  marginBottom:5}

  const hiddenInfo = {display: showHidden? "": "none"}

    return(
    <div style = {blogStyle}>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button
        onClick = {()=>setShowHidden(!showHidden)}>
        {showHidden? "Hide info" : "Show info"}
      </button>
      <div style = {hiddenInfo}>
        <p>Likes: {blog.likes}</p>
        <button onClick = {incrementLikes}>like</button>
        <p>Url: {blog.url}</p>
        <button onClick = {handleDelete}>
          Delete blog?
        </button>
      </div>
    </div>
    )
}

export default Blog
