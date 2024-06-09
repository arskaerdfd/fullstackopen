import {incrementVote} from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>{
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }



  return(
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList