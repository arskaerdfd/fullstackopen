import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const vote = async (id) => {

  const url = `${baseUrl}/${id}`
  const anecdote = await axios.get(url)
  console.log('anecdote', anecdote.data)
  
  anecdote.data.votes++
  const response = await axios.put(url, anecdote.data)
  return response.data
}


export default { getAll, createNew, vote }