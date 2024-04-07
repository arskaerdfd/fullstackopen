import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('Title gets rendered', async () => {
  const blog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  const { container } = render(<Blog blog={blog} />)
  expect(container).toHaveTextContent('Type wars')
  expect(container).not.toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  expect(container).not.toHaveTextContent('2')
})

test('Likes and url shown when button is clicked', async () => {
  const blog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }


  const { container } = render(<Blog blog={blog} />)


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.debug()

  expect(container).toHaveTextContent('2')
  expect(container).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')

})

test('When like button is clicked twice, two event handlers are called'), async () => {
  const blog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)

  const mockHandler = vi.fn()

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByAltText('like')
  screen.debug()
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


}

