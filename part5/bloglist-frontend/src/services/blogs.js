import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log('token', token)
  
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("new blog", newObject)
  console.log('conf', config)
  
  const response = await axios.post(baseUrl, newObject, config)
  console.log('res', response)
  
  return response.data
}

const update = async newObject => {
  const url = `${baseUrl}/${newObject.id}`
  const response = await axios.put(url, newObject)
  console.log('like updated', newObject)
  return response.data
  
}

const deleteBlog = async blogObject => {
  console.log('deleteBlog', blogObject)
  
  const url = `${baseUrl}/${blogObject.id}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(url, config)
  return response.data
}
export default { getAll, create, setToken, update, deleteBlog }