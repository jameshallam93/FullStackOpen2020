import React from "react"
import { useState } from "react"
const BlogForm = ({handleNewBlog}) =>{

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const clearNewBlogBox = () =>{
        setTitle("")
        setAuthor("")
        setUrl("")
      }

    const onSubmit = (event) =>{
        const newBlog = {
            title:title,
            author:author,
            url:url
        }
        handleNewBlog(event, newBlog)
        clearNewBlogBox()
    }
        return(
        <div>
        <h1>Add a new Blog</h1>
        <form onSubmit = {onSubmit}>
        <div>
            <div>
            title:
                <input type = "text"
                className = "title"
                name = "title"
                value = {title}
                onChange = {({target}) => setTitle(target.value)}
                ></input>
            </div>
            <div>
            author:
                <input type = "text"
                className = "author"
                name = "author"
                value = {author}
                onChange = {({target}) =>setAuthor(target.value)}
                />

            </div>
            <div>
            url:
                <input type = "text"
                className = "url"
                name = "url"
                value = {url}
                onChange = {({target}) =>setUrl(target.value)}
                />

                <button type = "submit"
                className = "submit"
                onClick = {onSubmit}>
                Create
                </button>
            </div>
        </div>
        </form>
        </div>
        )
}

export default BlogForm

