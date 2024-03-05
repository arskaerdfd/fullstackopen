const Blog = require("../models/blog")
const blogsRouter = require('express').Router()



blogsRouter.get('/', (request, response) => {
  
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({error: "Title or url missing"})
  }
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter

