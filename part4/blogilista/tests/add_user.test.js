const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)



describe("When there is initially one user at db", () => {

  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sektret', 10)
    const user = new User({ username: "root", passwordHash })
  
    await user.save()
  })


  test('creation succeeds with a fresh username', async () => {

    const newUser = {
      username: 'arska',
      name: 'arska',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const res = await api.get('/api/users')
  
  
    expect(res.body).toHaveLength(2)
  })

  test('creation fails when username is too short', async () => {

    const newUser = {
      username: 'ar',
      name: 'ar',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const res = await api.get('/api/users')
  
  
    expect(res.body).toHaveLength(1)
  })

  test('creation fails when username is not unique', async () => {

    const newUser = {
      username: 'root',
      name: 'arska',
      password: 'salainen',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const res = await api.get('/api/users')
  
  
    expect(res.body).toHaveLength(1)
  })

  
  afterAll(async () => {
    await mongoose.connection.close()
  })

})
