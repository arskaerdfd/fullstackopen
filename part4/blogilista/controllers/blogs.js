const Blog = require("../models/blog")
const blogsRouter = require('express').Router()



blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {

  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch {
    response.status(404).json({error: "Blog not found"})
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({error: "Title or url missing"})
  }
  
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch {
    response.status(404).end()
  }
})

module.exports = blogsRouter

