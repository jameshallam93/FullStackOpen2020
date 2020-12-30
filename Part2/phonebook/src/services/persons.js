import Axios from "axios"

const baseUrl = "/api/persons"

const getAll = () =>{
const response = Axios.get(baseUrl)
return response.then(response => response.data)
}

const addNew = (person) =>{
    const request = Axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const update = (person, id) =>{
    console.log(person)
    const request = Axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

const handleDelete = (id) =>{
   Axios.delete(`${baseUrl}/${id}`)
}

export default{ getAll, addNew, handleDelete, update }