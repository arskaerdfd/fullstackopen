import { useState } from 'react'

const CreateForm = ({ handleCreation }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    handleCreation(newBlog)
    console.log('new blog createForm', newBlog)


    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text"
          data-testid='title'
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Type title here'
        />
      </div>
      <div>
      author
        <input type="text"
          data-testid='author'
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Type author here'
        />
      </div>
      <div>
      url
        <input type="text"
          data-testid='url'
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='Type url here'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm