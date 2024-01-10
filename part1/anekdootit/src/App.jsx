import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({anecdote, value}) => {
   return(
    <p>
      {anecdote} <br></br>
      has {value} votes
    </p>
   )
}

const Head = ({text}) => {
  return(
  <h1>
    {text}
  </h1>
  )
}

const BestAnecdote = ({anecdotes, votes}) => {
  const mostVotes = Math.max(...votes)
  const index = votes.indexOf(mostVotes)

  return(
    <p>
      {anecdotes[index]} <br></br>
      has {mostVotes} votes
    </p>  
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setAllPoints] = useState(Array(anecdotes.length).fill(0))


  console.log(points)


  const handleRandom = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    console.log("Random int", randomInt)
    setSelected(randomInt)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setAllPoints(copy)
  }

  return (
    <div>
      <Head text={"Anecdote of the day"} />
      <Anecdote anecdote={anecdotes[selected]} value={points[selected]} />
      <Button onClick={handleVote} text={"vote"} />
      <Button onClick={handleRandom} text={"next anecdote"} />
      <Head text={"Anecdote with most votes"} />
      <BestAnecdote anecdotes={anecdotes} votes={points} />
    </div>
  )
}

export default App