import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationReset } from "../reducers/notificationReducer"



const AnecdoteForm = () =>{

    const dispatch  = useDispatch()


    const newAnecdote = async (event) =>{
        event.preventDefault()
        
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(anecdote))
        setTimeout(()=>{dispatch(notificationReset())}, 5000)
    }
    return(
        <div>
        <h2>create new</h2>
        <form onSubmit = {newAnecdote}>
        <div><input name = "anecdote"/></div>
        <button type = "submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm 