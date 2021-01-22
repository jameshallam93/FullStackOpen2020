const userRouter = require("../controllers/users")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const users = [
    {
        username: "BigCheese",
        name: "Toma",
        password: "Ridiculous"
    },
    {
        username:"Micahman",
        name: "Arnold",
        password:"generic"
    }
]
const newUser = {
    username:"BigBoyBen",
    name:"Benjamin",
    password:"ostrich"
}
const existingUser = {
    username: "BigCheese",
    name: "Martha",
    password:"existing"
}

const usersFromDb = async () =>{
    const users = await User.find({})

    return (users.map(user =>
        user.toJSON()))
}
/*
beforeEach(async () =>{
    await User.deleteMany({})
    
    const userObjects = users.map(user =>
        new User(user))
    
    const promiseArray = userObjects.map(user =>
        user.save())
    await Promise.all(promiseArray)
    }
)
*/
describe("when there is one user in the database ",() =>{

    beforeEach(async ()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("remember", 10)
        console.log(`password hash: ${passwordHash} ${typeof passwordHash}`)
        const newUser = new User({
            username:"BigCheese",
            name:"Mary",
            passwordHash
        })
        await newUser.save()
    }
    )
    test("valid user can be added", async () =>{
        const usersAtStart = await usersFromDb()
    
        const result = await api.post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    
        const usersAtEnd = await usersFromDb()
    
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(user =>
            user.username)
        expect(usernames).toContain("BigBoyBen")
    
    })
    
    test("a user with an existing username will not be added", async ()=>{
        const usersAtStart = await usersFromDb()
        const userToFail = {
            username: "BigCheese",
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
})

afterAll(async () =>{
    await mongoose.connection.close()})