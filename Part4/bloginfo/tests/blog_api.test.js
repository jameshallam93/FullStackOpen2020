const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("../utils/api_test_helper")
const api = supertest(app)
const logger = require("../utils/logger")

beforeEach(async ()=>{
    await Blog.deleteMany()
    const blogObjects = helper.blogsAtStart.map(blog =>
        new Blog(blog)
        )
    const promiseArray = blogObjects.map(object =>
        object.save()
        )
    await Promise.all(promiseArray)
})

describe("notes that are saved in the database ", ()=>{

    test("are all returned in json format", async ()=>{
        const result = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    
        expect(result.body).toHaveLength(helper.blogsAtStart.length)
    })

    test("have a unique identifying property, id, which exists for each blog", async() =>{
        const ids = await helper.fetchId()
    
        expect(ids).toBeDefined()
    })

    test("can be deleted", async () =>{
        const blogsAtStart = await helper.blogsFromDb()
        const idToDelete = (blogsAtStart.map(blog => blog.id))[0]
        const result = await api.delete(`/api/blogs/${idToDelete}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsFromDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })
})

describe("when sending new blogs, ", () =>{

    test("sending POST request increases number of blogs in DB by one", async () =>{
        const blogObject = (helper.newBlog)
        await api.post("/api/blogs")
            .send(blogObject)
            .expect(201)
            .expect("Content-Type", /application\/json/)
    
        const blogsAtEnd = await helper.blogsFromDb()
        expect(blogsAtEnd).toHaveLength(helper.blogsAtStart.length + 1)
    })
    
    test("likes default to 0 if not present already", async () =>{
        const blogObjectNoLikes = 
        {
            title: "no likes",
            author: "James",
            url: "http:localhost:6969"
        }

        const result = await api.post("/api/blogs")
            .send(blogObjectNoLikes)
            .expect(201)
            .expect("Content-Type", /application\/json/)   
        
        const body = result.body
        expect(body.likes).toEqual(0)
    })
    
    test("if title and url are missing from new blog, status 400 is returned", async () =>{
        const blogNoTitle = {
            author:"James",
            likes:"10"
        }
        const blogObject = new Blog(blogNoTitle)

        await api.post("/api/blogs")
            .send(blogObject)
            .expect(400)
    })
})


describe("when updating the likes on a note ", () =>{

    test("updated note and 200 status are returned", async ()=>{
        
        const blogsAtStart = await helper.blogsFromDb()
        const blogToUpdate = blogsAtStart[0]
        const originalLikes = blogToUpdate.likes
        blogToUpdate.likes = blogToUpdate.likes + 1

        const result = await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        
        expect(result.body.likes).toEqual(originalLikes + 1)
    })
    
    test("number of notes in database remains the same", async ()=>{
        const blogsAtStart = await helper.blogsFromDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = blogToUpdate.likes + 1

        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
        

        const blogsAtEnd = await helper.blogsFromDb()
        expect(blogsAtStart).toHaveLength(blogsAtEnd.length)
    })
})



afterAll(()=>{
    logger.info('closing connection'),
    
    mongoose.connection.close()
})