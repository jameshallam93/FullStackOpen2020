import axios from 'axios'

const baseUrl = '/api/blogs'

let token;

const setToken = (newToken) =>{
  token = `bearer ${newToken}`
  
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers:
    {Authorization:token}
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)

}
export default { getAll, setToken, create }