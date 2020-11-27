import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import Display from "./components/Display"

// for changing bg color - some flags only work on a white background, but the weather icons only work 
// on non-white backgrounds.

const Button = ({color}) =>{
  return (
    <>
    <button onClick = {document.body.style.background = color}>{color}</button>
    </>
  )
}

const App = () => {

    const [countries, setCountries] = useState([])
    const [newSearch, setSearch] = useState("")
    
  //country info
    useEffect(()=>{
      axios.get("https://restcountries.eu/rest/v2/all")
      .then(response=>{
        setCountries(response.data)
      })
    },[])
   //passed down to SearchResult component through Display component - for autocompleting search box
   //on clicking "Show button" next to search suggestions
    const handleClick = (name) =>{
        setSearch(name)
    }
  
    const containsSearchTerm = (country) =>{
      return country.name.includes(newSearch)
    }
  
    const countriesToShow = countries.filter(containsSearchTerm)
  
    return(
      <>
      <div>find countries</div>
      <input value = {newSearch}
      onChange ={(event)=>{
        setSearch(event.target.value)
      }}>
      </input>
      <Display countries = {countriesToShow} handleClick = {handleClick}/>
      <Button color = {"white"}/>
      <Button color = {"Grey"}/>


      </>
    )
  }

export default App