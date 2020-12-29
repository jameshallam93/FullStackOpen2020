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

    const request =  Axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll, create, update }