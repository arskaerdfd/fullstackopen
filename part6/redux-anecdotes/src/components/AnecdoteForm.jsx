import { createAnecdote } from "../reducers/anecdoteReducer"
import {useDispatch } from 'react-redux'
import { setNotification } from "../reducers/notificationReducer"



const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`created anecdote '${event.target.anecdote.value}'`))
    event.target.anecdote.value = ''
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /> </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm