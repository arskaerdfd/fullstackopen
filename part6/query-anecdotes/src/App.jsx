import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote} from './requests'
import { useReducer } from 'react'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {


  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()



  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  console.log('anecdotes', anecdotes)
  
  if (result.isError) {
    return <div>anecdote server not available due to problems in server</div>
  }


  const handleVote = ( anecdote ) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: "SET", payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App