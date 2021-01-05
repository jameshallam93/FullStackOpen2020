require("dotenv").config()

const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(result =>{
    console.log(`Connected to ${url} successfully`)
})
.catch(error =>{
    console.log(`Error connecting to database: ${error.message}`);
    
})

const noteSchema = new mongoose.Schema({
    content:{
        type:String,
        minLength:5,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        required:true
    },
    important:Boolean
})

noteSchema.plugin(uniqueValidator)

noteSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Note", noteSchema)
