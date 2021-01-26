import Axios from "axios"

const baseUrl = "/api/notes"

let token;

const setNewToken = newToken =>{
    token = `bearer ${newToken}`
}

const getAll=() =>{
    const request =  Axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = (newObject) =>{
    const config = {
        headers: {Authorization: token}
    }
    const request =  Axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}
const update = (id, newObject) =>{
    console.log(`ID: ${id}, baseurl: ${baseUrl}`)
    const request =  Axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) =>{
    const config = {
        headers: {Authorization: token}
    }
    const request = Axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)

}

export default { getAll, create, update, remove, setNewToken }