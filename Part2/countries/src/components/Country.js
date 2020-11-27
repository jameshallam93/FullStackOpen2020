import React from "react"
import { nanoid } from "nanoid"

const Country = ({country}) =>{
    return(
    <>
      <p><b>Capital</b> {country.capital}</p>
      <p><b>Population</b> {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language=>{
          return(<li key = {nanoid()}>{language.name}</li>)})}
      </ul>
      <img src = {country.flag} width = "200px" height = "150px" alt = "Flag of the searched country"></img>
    </>
    )
}

export default Country