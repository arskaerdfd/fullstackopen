const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')


TOKEN = ''


beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  
  await api
    .post('/api/users')
    .send({
      name: "root",
      username: "root",
      password: "root",
    })

  const rootResponse = await api
    .post('/api/login')
    .send({username: "root", password: "root"})
    .expect(200)

  
  TOKEN = rootResponse.body.token
})

test('blogs can be added', async () => {

  const newBlog = {
    _id: "5a422bc61b54a676234d17f2",
    title: "Mä vähän dokautin",
    author: "Huutinen",
    url: "http://www.google.com",
    likes: 212,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${TOKEN}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')

  const titles = res.body.map(r => r.title)

  expect(res.body).toHaveLength(1)

  expect(titles).toContain("Mä vähän dokautin")
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('blogs cant be added without token', async () => {

  const newBlog = {
    _id: "5a422bc61b54a676234d17f2",
    title: "Mä vähän dokautin",
    author: "Huutinen",
    url: "http://www.google.com",
    likes: 212,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const res = await api.get('/api/blogs')

  const titles = res.body.map(r => r.title)

  expect(res.body).toHaveLength(0)

})

afterAll(async () => {
  await mongoose.connection.close()
})