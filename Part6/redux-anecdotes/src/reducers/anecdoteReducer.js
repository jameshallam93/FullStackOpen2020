
import anecdoteService from "../services/anecdotes"



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const incrementVotes = (id, content) =>{
  return async dispatch =>{
    await anecdoteService.increaseVotes(id, content)
    dispatch({
      type:"INCREMENT_VOTES",
      data: {
        id,
        content
      }
    })
  }
}

export const createAnecdote = (content) =>{
  return async dispatch =>{
    await anecdoteService.createNew(content)
    dispatch({
      type:"NEW_ANECDOTE",
      data:asObject(content)
    })
  }
}

export const initializeAnecdotes = () =>{
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:"INIT_ANECDOTES",
      data: anecdotes
    })
  }
}



const reducer = (state = [], action) => {

  switch (action.type){

    case "INIT_ANECDOTES":
      return action.data

    case "INCREMENT_VOTES":
      const id = action.data.id
      const toUpdate = state.find(anecdote =>
        anecdote.id === id)
      const updated = {
        ...toUpdate,
        votes:toUpdate.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id? anecdote: updated)

    case "NEW_ANECDOTE":
        return [...state, action.data]

    default:
      return state
  }
}

export default reducer