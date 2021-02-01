import axios from 'axios'

const baseUrl = '/api/blogs'

let token;

const setToken = (newToken) =>{
  token = `bearer ${newToken}`
  
}
const generateBlog = (title, author, url) =>{
  return {
    title: title,
    author:author,
    url:url
  }
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

const update = (updatedObject) =>{
  const request = axios.put(baseUrl.concat(`/${updatedObject.id}`), updatedObject)
  return request.then(response =>response.data)
}

const remove = (object) =>{
  const config = {
    headers:
    {Authorization:token}
  }
  const request = axios.delete(baseUrl.concat(`/${object.id}`), config)
  return request.then(response => response.data)
}
export default { getAll, setToken, create, generateBlog, update, remove }