const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const Note = require("../models/note")
const User = require("../models/user")
const { findById } = require("../models/note")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const api = supertest(app)



beforeEach(async ()=>{
    await Note.deleteMany({})
    const noteObjects = helper.notes.map(note =>
        new Note(note)
    )
    const promiseArray = noteObjects.map(object =>
        object.save()
    )
    await Promise.all(promiseArray)

})



test("notes are returned in json ", async ()=>{
    await api
        .get("/api/notes")
        .expect(200)
        .expect('Content-Type', /application\/json/)

})


test("all notes are returned", async ()=>{
    const response = await api.get("/api/notes")

    expect(response.body).toHaveLength(helper.notes.length)
    }
)

test("a specific note is returned within the notes", async ()=>{
    const response = await api.get("/api/notes")

    const notesToCheck = response.body.map(response =>{
        return response.content
    })
    expect(notesToCheck).toContain(
        "Browser can only execute javascript"
    )
})

test("a valid note can be added", async ()=>{
    const newNote = {
        content:"Valid test note",
        date: new Date(),
        important: false
    }

    await api
    .post("/api/notes")
    .send(newNote)
    .expect(200)
    .expect("Content-Type", /application\/json/)

    const notesAtEnd = await helper.notesFromDb()
    expect(notesAtEnd).toHaveLength(helper.notes.length + 1)
    const contents = notesAtEnd.map(note =>
        note.content
    )
    expect(contents).toContain("Valid test note")
})

test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesFromDb()
  
    expect(notesAtEnd).toHaveLength(helper.notes.length)

  })

test("a specific note can be viewed", async () =>{
    const notesAtStart = await helper.notesFromDb()
    const noteToView = notesAtStart[0]

    const noteFromDb = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

    const processedNote = JSON.parse(JSON.stringify(noteToView))

    expect(noteFromDb.body).toEqual(processedNote)

})

test("a specific note can be deleted", async ()=>{
    const notesAtStart = await helper.notesFromDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

    const notesAtEnd = await helper.notesFromDb()
    expect(notesAtEnd).toHaveLength(notesAtStart.length - 1)
})

describe("when there is only one user in the database ", () =>{
    beforeEach(async ()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("remember", 10)
        console.log(`password hash: ${passwordHash} ${typeof passwordHash}`)
        const newUser = new User({
            username:"root",
            passwordHash
        })
        await newUser.save()
    }
    )

    test("creation succeeds with a fresh username", async () =>{
        const usersAtStart = await helper.usersInDb()
        const newUser = 
            {
            username: "James",
            name: "Tom Tugger",
            password: "testHash"
        }
        
        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)
        

        const usersAtEnd = await helper.usersInDb()
        const usernames = usersAtEnd.map(user =>
            user.username)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        expect(usernames).toContain("James")
    })

    test("creation fails if username already exists", async () =>{
        const usersAtStart = await helper.usersInDb()
        const userToFail = {
            username: "root",
            name:"Mandrake",
            password:"12345678"
        }
        const result = await api.post("/api/users")
        .send(userToFail)
        .expect(400)
        .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("`username` to be unique")

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtStart).toHaveLength(usersAtEnd.length)
    })

    test("creation fails if username less than 8 characters", async ()=>{
        const usersAtStart = await helper.usersInDb()

        const userToFail = {
            username:"Ramsit",
            name:"Oscar",
            password:"short"
        }

        const result = await api.post("/api/users")
        .send(userToFail)
        .expect(400)
        .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        
    })

})

afterAll(() =>{
    mongoose.connection.close()})