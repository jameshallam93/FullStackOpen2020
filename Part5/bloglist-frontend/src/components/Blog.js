import React from 'react'
import { useState } from "react"
import blogService from "../services/blogs"
import helper from "../utils/blogHelper"

const Blog = ({ blog, updateBlogs, notification }) => {

  const [showHidden, setShowHidden] = useState(false)
  
  const incrementLikes = async () =>{
    await helper.updateLikes(blog)
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
    <div style = {blogStyle}
    className = "blog">
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <button
        onClick = {()=>setShowHidden(!showHidden)}>
        {showHidden? "Hide info" : "Show info"}
      </button>
      <div style = {hiddenInfo}
      className = "hiddenInfo">
        <p>Likes: {blog.likes}</p>
        <button onClick = {incrementLikes}>Like</button>
        <p>Url: {blog.url}</p>
        <button onClick = {handleDelete}>
          Delete blog?
        </button>
      </div>
    </div>
    )
}

export default Blog
