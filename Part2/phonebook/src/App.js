import React, { useState, useEffect } from "react";

import Person from "./components/Person"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Heading from "./components/Heading"
import Notification from "./components/Notification"
import PersonService from "./services/persons"

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
    
    const updatePerson = (personObject, id) =>{
      PersonService.update(personObject, id)
      .then(returnedPerson =>
        setPersons(persons.map(person =>
          person.id !== id ? 
          person 
          :
          returnedPerson)))
          .catch(() =>{
            setMessage(`Error: ${personObject.name} has already been deleted from the server`)
            setTimeout(()=>{setMessage(null)},5000)
          })
      setMessage(`${personObject.name} has been updated`)
      setTimeout(()=>{setMessage(null)},5000)
    }

    const handleExistingPerson = (personObject, newPerson) =>{
      if (window.confirm(
        `${newPerson} is already added to the phonebook, replace the old number with a new one?`)){
          //finds the id of the "new" person object from persons state
          const id = persons.filter(person => person.name === personObject.name)[0].id
          updatePerson(personObject, id)
        
      }
    }

    const handleNewPerson = (event) =>{
      //prevents default form handling
      event.preventDefault()

      const personObject = {
        name: newPerson,
        number: newNumber
      }

      //checks to see if persons state already contains newPerson, and handles update if so
      if(listContainsName(newPerson)){
        handleExistingPerson(personObject, newPerson)
      }
      else{
      PersonService
      .addNew(personObject)
      .then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
      })

      setNewPerson("")
      setNewNumber("")
      console.log(notificationMessage)
      setMessage(`${newPerson} has been added to the phonebook`)
      setTimeout(()=>{setMessage(null)}, 5000)
      }
    }

    const handleDelete = (id) =>{
      const personToDelete = persons.filter(person => person.id === id)[0].name

      if (window.confirm(`Are you sure you want to delete ${personToDelete}?`)){
      PersonService.handleDelete(id)
      setPersons(persons.filter(person => 
        person.id !== id))
        setMessage(`${personToDelete} has been deleted`)
        setTimeout(()=>{setMessage(null)},5000)
      }
    }
  
    return(
        <div>
          <Notification message = {notificationMessage}/>
            <Filter value = {newSearch}
              onChange = {(event) =>{
                setSearch(event.target.value)}}
            />

            <Form onSubmit = {handleNewPerson}
              valuePers = {newPerson}
              valueNum = {newNumber}
              //event handlers for updating state to match what is in input box
              //without these, text box is not mutable.
              onPersChange = {(event) => setNewPerson(event.target.value)}
              onNumChange = {(event) => setNewNumber(event.target.value)}
            />

            <Heading text = {"Numbers"}/>

            {filteredPersons.map(person =>
              <Person key = {person.name} 
              person = {person} 
              handleDelete = {handleDelete}/>
            )}
        </div>
    )
  }

export default App