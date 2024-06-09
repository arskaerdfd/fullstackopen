/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdotes'

import { createSlice } from "@reduxjs/toolkit"



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes++
      }
      state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
export const { appendAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    console.log('newAnecdote', newAnecdote)
    
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => b.votes - a.votes)

    dispatch(setAnecdotes(anecdotes))
  }
}

export const incrementVote = (id) => {
  console.log('id', id)

  return async dispatch => {
    const response = await anecdoteService.vote(id)
    console.log('response', response)
    
    dispatch(updateVote(id))
  }
}

export default anecdoteSlice.reducer