import { useState } from 'react'

const Blog = ({ blog, handleLike, user, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {setShowInfo(!showInfo)}

  const updateLike = (event) => {
    event.preventDefault()
    const updatedBlog = blog
    updatedBlog.likes += 1
    handleLike(updatedBlog)
    console.log('updateLike', updatedBlog)
  }

  const deleteBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`) && handleDelete(blog)
  }

  if (!showInfo) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleInfo}> view </button>
      </div>
    )} else {
    return(
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={toggleInfo}> hide </button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={updateLike}> like </button></div>
        <div>{blog.author}</div>
        {user && user.username === blog.user.username &&
          <button onClick={deleteBlog}>delete</button>}

      </div>
    )
  }
}


export default Blog
