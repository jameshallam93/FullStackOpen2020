import React from "react"

const BlogForm = (props) =>{



        return(
        <div>
        <h1>Add a new Blog</h1>
        <form>
        <div>
            <div>
            title:
                <input type = "text"
                name = "title"
                value = {props.titleState}
                onChange = {({target}) => props.setTitle(target.value)}
                ></input>
            </div>
            <div>
            author:
                <input type = "text"
                name = "author"
                value = {props.authorState}
                onChange = {({target}) =>props.setAuthor(target.value)}
                />

            </div>
            <div>
            url:
                <input type = "text"
                name = "url"
                value = {props.urlState}
                onChange = {({target}) =>props.setUrl(target.value)}
                />
            </div>
                <button type = "submit"
                onClick = {props.onSubmit}>
                create
                </button>
        </div>
        </form>
        </div>
        )
}

export default BlogForm

