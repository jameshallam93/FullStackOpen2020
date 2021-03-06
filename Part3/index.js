//unused currently
//const { json } = require("express")

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const Person = require("./models/person")

var morgan = require("morgan")
 


const app = express()

app.use(bodyParser.json())
app.use(express.static("build"))
app.use(cors())

morgan.token("body", function(req, res){
    console.log(res.body)
    const toReturn = req.body
    return JSON.stringify(toReturn)
})

app.use(morgan(":method :url :status :body"))




app.get("/api/info", (request, response) =>{
    var len = 0
    Person.find({}).then(persons =>{
        len = persons.length
        response.send(`<p>Phonebook has info for ${len} people</p>
        <p>${new Date()}</p>`)
    })
})

app.get("/api/persons", (request, response) =>{
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get("/api/persons/:id", (request, response) =>{

    Person.findById(request.params.id).then(person =>{
        response.status(200).json(person)
    })

})

app.delete("/api/persons/:id",(request, response, next) =>{
    Person.findByIdAndDelete(request.params.id)
        .then(result =>{
            console.log(`Person with id: ${request.params.id} has been deleted`)
            console.log(result.body)
        
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.put("/api/persons/:id", (request, response, next) =>{
    const body = request.body
    const updatedPerson = {
        name:body.name,
        number:body.number
    }
    Person.findByIdAndUpdate(request.params.id, updatedPerson, {new:true})
        .then(result =>{
            response.send(result)
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) =>{
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(returnedPerson =>{
        console.log(`${body.name} saved successfully`)
        response.json(returnedPerson)
    })
        .catch(error =>{
            next(error)
        })
})

const errorHandler = (error, request, response, next) =>{
    console.error(error)

    if (error.name === "CastError"){
        return response.status(400).send({error: "Malformed ID"})
    } else if (error.name === "ValidationError"){
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
