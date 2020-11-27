import React from "react"
import { nanoid } from "nanoid"
import Country from "./Country"
import SearchResult from "./SearchResult"
import Weather from "./Weather"

const Display = ({countries, handleClick}) =>{

    //conditional return statement:
    // 1) more than ~10 countries - returns top statement
    // 2) one country - return Country and Weather components, passes country to them as props
    // 3) 1<x<10, returns list of countries containing search term in their name

    if (countries.length > 9){
        return(
          <p>Too many results - try again</p>
        )
      }else if 
      (countries.length === 1){
        return(
          <div>
            <h1>{countries[0].name}</h1>
            <Country country = {countries[0]}/>
            <Weather country = {countries[0]}/>
          </div>
        )
      }else{
        return(
          countries.map(country =>{
              return <SearchResult key = {nanoid()} country = {country} handleClick = {handleClick}/>

          })
        )
      }
    }
    


export default Display