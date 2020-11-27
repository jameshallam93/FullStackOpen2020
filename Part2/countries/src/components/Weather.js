import React, { useState, useEffect } from "react"
import Axios from "axios"


const Weather = ({country}) =>{


    const [currentData, setData] = useState([])
    const [weatherIcon, setIcon] = useState()



        useEffect(()=>
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API}`)
        .then(response =>{
            setData(response.data.main)
        }).catch(error =>{
            console.log("Error:",error)
        }), [])

        useEffect(()=>
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API}`)
        .then(response =>{
            setIcon(response.data.weather[0].icon)
        }).catch(error =>{
            console.log("Error:",error)
        }), [])
        
        const temp = currentData.temp
      
    return(
        <>
        <h1>Weather in {country.capital}</h1>
        <p>Temperature is {Math.floor(temp - 273.15)} Degrees Celcius</p>
        <img src = {`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>
        </>
    )
}

export default Weather