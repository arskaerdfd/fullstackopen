import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import PositiveNotification from './components/PositiveNotification'
import NegativeNotification from './components/NegativeNotification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [posMessage, setPosMessage] = useState(null)
  const [error, setError] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()

    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log("ex", exception)
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
      
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const request = await blogService.create({
        title, author, url,
      })
      setPosMessage(`A new blog, ${title} by ${author}, added`)
      setAuthor("")
      setTitle("")
      setUrl("")
      setTimeout( () => {
        setPosMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('ex', exception)
      setError(exception.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
      
    }
  }



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {



    return(
      <div>
        <NegativeNotification message={error} />
        <LoginForm username={username}
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
      
  )}

  const blog = () => (
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
    <PositiveNotification message={posMessage} />
    <NegativeNotification message={error} />
    <Togglable buttonLabel="new blog">
      <CreateForm
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
      handleCreation={handleCreation}
      />
    </Togglable>
    
    <Blog blogs={blogs} />
    </div>
  )



  return (
    <div>
      { !user && loginForm() }
      { user && blog() }
    </div>
  )
}

export default App