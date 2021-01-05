import React, { useState, useEffect } from "react";

import Person from "./components/Person"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Heading from "./components/Heading"
import Notification from "./components/Notification"
import PersonService from "./services/persons"
import { getNodeText } from "@testing-library/react";

const App = () => {

    const [persons, setPersons] = useState([])

    const [newPerson, setNewPerson] = useState("")
  
    const [newNumber, setNewNumber] = useState("")
  
    const [newSearch, setSearch] = useState("")

    const [notificationMessage, setMessage] = useState(null)

    useEffect(()=>{
      PersonService.getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
    },[])

    //check to see if anything has been entered in the search/filter box
    const isSearch = () =>{
      return !(newSearch === "")
    }

    //if search box is empty, return all - otherwise only return those that include newSearch state
    //toLowerCase ensures caps don't matter in search term
    const filteredPersons = (
      isSearch ?
      persons.filter(person =>
        person.name.toLowerCase().includes(newSearch.toLowerCase()))
        :
        persons
    )

    // checks to see if persons state contains a name already
    const listContainsName = (name) =>{
      const names = persons.map(person =>{
        return person.name
      })
      return names.includes(name)
    }

    // avoid copy/paste code
    const setMessageTimeout = (message) =>{
      setMessage(message)
      setTimeout(()=>{setMessage(null)},5000)
    }

    const updatePerson = (personObject, id) =>{
      PersonService.update(personObject, id)
      .then(returnedPerson =>
        setPersons(persons.map(person =>
          person.id !== id ? 
          person 
          :
          returnedPerson)))
          .catch(() =>{
            setMessageTimeout(`Error: ${personObject.name} has already been deleted from the server`)
          })
      setMessageTimeout(`${personObject.name} has been updated`)
    }

    const handleExistingPerson = (personObject) =>{
      if (window.confirm(
        `${personObject.name} is already added to the phonebook, replace the old number with a new one?`)){
          //finds the id of the "new" person object from persons state
          const id = persons.filter(person =>
            person.name === personObject.name)[0].id
          updatePerson(personObject, id)
        
      }
    }

    const handleNewPerson = (event) =>{
      //prevents default form handling
      event.preventDefault()
      //two state strings linked to text boxes
      const personObject = {
        name: newPerson,
        number: newNumber
      }

      //checks to see if persons state already contains newPerson, and handles update if so
      if(listContainsName(newPerson)){
        handleExistingPerson(personObject)
      }
      else{
      PersonService
      .addNew(personObject)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewPerson("")
        setNewNumber("")
        setMessageTimeout(`${newPerson} has been added to the phonebook`)
      })
      .catch(error =>
        setMessageTimeout(error.response.data.error))
      }
    }

    const handleDelete = (id) =>{

      const personToDelete = persons.filter(person => person.id === id)[0].name

      if (window.confirm(`Are you sure you want to delete ${personToDelete}?`)){
      PersonService.handleDelete(id)
      setPersons(persons.filter(person => 
        person.id !== id))
        setMessageTimeout(`${personToDelete} has been deleted`)
      }
    }
    
    const uniStyle = {
      background:"lightGrey"
    }
    const personBoxStyle = {
      border:"solid",
      color:"green",
      margin:"left",
      width:300,
      background:"lightGreen"
    }
    const formBoxStyle = {
      ...personBoxStyle,
      width:475,
      height:55
    }
    const searchBoxStyle = {
      ...personBoxStyle,
      height:35
    }

    return(
        <div style = {uniStyle}>

          <Heading text = {"Search for a name"}/>

          <Notification message = {notificationMessage}/>

          <div style = {searchBoxStyle}>

            <Filter value = {newSearch}
              onChange = {(event) =>{
                setSearch(event.target.value)}}
            />

          </div>

          <Heading text = {"Add a new contact"}/>

          <div style = {formBoxStyle}>

            <Form onSubmit = {handleNewPerson}
              valuePers = {newPerson}
              valueNum = {newNumber}
              //event handlers for updating state to match what is in input box
              //without these, text box is not mutable.
              onPersChange = {(event) => setNewPerson(event.target.value)}
              onNumChange = {(event) => setNewNumber(event.target.value)}
              />

          </div>


          <Heading text = {"Numbers"}/>

          <div style = {personBoxStyle}>

            {filteredPersons.map(person =>
              <Person key = {person.name} 
              person = {person} 
              handleDelete = {handleDelete}
              />
            )}

          </div>
        </div>
    )
  }

export default App