const Blog = require("../models/blog")
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')




blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  
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




blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id

  })


  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.url || !blog.title) {
    return response.status(400).json({error: "Title or url missing"})
  }
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor,  async (request, response) => {

  const user = request.user

  try {
    const blogToDelete = await Blog.findById(request.params.id)
    

    if ( blogToDelete.user._id.toString() === user._id.toString() ) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: "Token doesn't match the user of the blog"})
    }

  } catch(ex) {
    console.log('ex', ex)
    
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    _id: body._id,
    __v: body.__v
  })

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch {
    response.json({error: "Blog not found"})
  }
})


module.exports = blogsRouter

