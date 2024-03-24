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

export default { getAll, create, setToken }