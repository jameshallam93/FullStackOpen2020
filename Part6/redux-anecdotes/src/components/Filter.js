import React from "react"
import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"


const Filter = () =>{
    const dispatch = useDispatch()
    const handleChange = (event) =>{
        const value = event.target.value
        dispatch(updateFilter(value))

    }
    return(
        <div>Filter:
            <input type = "text" onChange = {handleChange}></input>
        </div>
    )
}

export default Filter