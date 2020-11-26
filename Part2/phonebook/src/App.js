import React, { useState, useEffect } from "react";
import axios from "axios"

import Person from "./components/Person"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Heading from "./components/Heading"

const App = () => {
    //persons state, default is people array in index.js (contains names and numbers)
    const [persons, setPersons] = useState([])
    //newPerson and newNumber are assigned to the form inputs as values
    const [newPerson, setNewPerson] = useState("New name")
  
    const [newNumber, setNewNumber] = useState("telephone no.")
  
    const [newSearch, setSearch] = useState("")

    useEffect(()=>{
      axios.get("http://localhost:3001/persons")
      .then(response =>{
        setPersons(response.data)
      })
    },[])

    //check to see if anything has been entered in the search/filter box
    const isSearch = () =>{
      return !(newSearch === "")
    }
    //if search box is empty, return all - otherwise only return those that include newSearch state
    const filteredPersons = (
      isSearch ?
      persons.filter(person =>
        person.name.includes(newSearch))
        :
        persons
      
    )
    // checks to see if persons state contains a name already
    const containsName = (name) =>{
      const names = persons.map(person =>{
        return person.name
      })
      return names.includes(name)
    }
  
    const handleNewPerson = (event) =>{
      //prevents default form handling
      event.preventDefault()
        //target is an array referring to different inputs and related values,
        // each target element contains 1 value
      const newTel = event.target[1].value;    
  
      const personObject = {
        name: newPerson,
        number: newTel
      }
  
      if(containsName(newPerson)){
        alert(`${newPerson} is already added to the phonebook`)
      }
      else{
      setPersons(persons.concat(personObject))
      setNewPerson(" ")
      setNewNumber(" ")
      }
    }
    
  
    return(
      <>
        <div>
            <Heading text = {"Search for a name"}/>

            <Filter value = {newSearch}
            onChange = {(event) =>{
                setSearch(event.target.value)}}/>
        </div>
        <div>
            <Heading text = {"Add a new number"}/>
            <Form onSubmit = {handleNewPerson}
            valuePers = {newPerson}
            valueNum = {newNumber}
            //event handlers for updating state to match what is in input box
            //without this, text box is not mutable.
            onPersChange = {(event) => setNewPerson(event.target.value)}
            onNumChange = {(event) => setNewNumber(event.target.value)}
            />
        </div>
        <div>
            <Heading text = {"Numbers"}/>
            {filteredPersons.map(person =>
            <Person key = {person.name} name = {person.name}/>
            )}
        </div>
      </>
    )
  }

export default App