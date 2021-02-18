import React from "react"
import { useDispatch, useSelector} from "react-redux"
import { incrementVotes } from "../reducers/anecdoteReducer"
import { notificationReset } from "../reducers/notificationReducer"

const AnecdoteList = () =>{
    const dispatch = useDispatch()

    //sorts all anecdotes based on number of votes, returns filtered results.
    const anecdotes = useSelector(({anecdotes, filter}) => {
        const anecdotesToReturn = anecdotes.sort((a, b) =>
        b.votes - a.votes)
        if (filter === ""){
            return anecdotesToReturn
        }
        return anecdotesToReturn.filter(anecdote =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    
    //requires the content field for notification reducer.
    const vote = (id, content) => {
        dispatch(incrementVotes(id, content))
        setTimeout(()=>{dispatch(notificationReset())}, 5000)
      }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
        )

}

export default AnecdoteList