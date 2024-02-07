import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const deleteObj = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
  }

export default { getAll, create, deleteObj, update }