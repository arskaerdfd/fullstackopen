import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Title gets rendered', async () => {
  const blog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const element = screen.getByText(/Type wars/)

  expect(element).toBeDefined()
})
