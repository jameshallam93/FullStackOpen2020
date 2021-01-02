import Axios from "axios"

const baseUrl = "/api/notes"

const getAll=() =>{
    const request =  Axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = (newObject) =>{
    const request =  Axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const update = (id, newObject) =>{
    console.log(`ID: ${id}, baseurl: ${baseUrl}`)
    const request =  Axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) =>{
    Axios.delete(`${baseUrl}/${id}`)

}

export default { getAll, create, update, remove }