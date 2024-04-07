import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'
import { expect } from 'vitest'

test('Create form should call the function with correct information', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<CreateForm handleCreation={mockHandler} />)


  const inputTitle = screen.getByPlaceholderText('Type title here')
  const inputAuthor = screen.getByPlaceholderText('Type author here')
  const inputUrl = screen.getByPlaceholderText('Type url here')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'title test')
  await user.type(inputAuthor, 'author test')
  await user.type(inputUrl, 'url test')

  await user.click(createButton)
  console.log('calls', mockHandler.mock.calls[0][0])
  

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual({ title: 'title test', author: 'author test', url: 'url test' })




})