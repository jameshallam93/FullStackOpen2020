import Axios from "axios"
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () =>{
    const response = await Axios.get(baseUrl)
    return response.data
}
const createNew = async (content) =>{
    const object = {content, votes: 0}
    const response = await Axios.post(baseUrl, object)
    return response.data
}
const increaseVotes = async (id, content) =>{
    const response = await Axios.get(`${baseUrl}/${id}`)
    const anecdoteToUpdate = response.data
    const updatedVotes = anecdoteToUpdate.votes + 1
    const updatedAnecdote = {
        content,
        votes: updatedVotes,
        id
    }
    await Axios.put(`${baseUrl}/${id}`, updatedAnecdote)

    
}
export default { getAll, createNew, increaseVotes }