const blogRouter = require("express").Router()
const Blog = require("../models/blog")


blogRouter.get("/", async (request, response) =>{
    const result = await Blog.find({})
        response.json(result)
})

blogRouter.post("/", async (request, response) =>{
    const body = request.body

    const blogToSave = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes
    })

    if (blogToSave.title){
        if (blogToSave.url){
            const result = await blogToSave.save()
            response.status(201).json(result).end()
        }
    }else{
        response.status(400).end()
    }
})

blogRouter.delete("/:id", async (request, response) =>{
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()

})

blogRouter.put("/:id", async (request, response) =>{
    
    const body = request.body

    const updatedBlog = {
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes
    }
    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})
    response.status(200).json(returnedBlog)
})
module.exports = blogRouter