import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"


const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      console.log(err)
      
      notificationDispatch({type: 'SET', payload: err.response.data.error})
      setTimeout( () => {
        notificationDispatch({type: 'CLEAR'})
      }, 5000)
    }
  })



  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      id: getId(),
      votes: 0
    })
    notificationDispatch({type: 'SET', payload: `anecdote '${content}' created`})
    setTimeout( () => {
      notificationDispatch({type: 'CLEAR'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
