const blogRouter = require("express").Router()
const Blog = require("../models/blog")


blogRouter.get("/", (request, response) =>{
    Blog.find({}).then(blogs =>{
        response.json(blogs)
    })
})

blogRouter.post("/", (request, response) =>{
    const body = request.body

    const blogToSave = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes
    })
    blogToSave.save().then(result =>{
        response.status(201).json(result)
    })
})

module.exports = blogRouter