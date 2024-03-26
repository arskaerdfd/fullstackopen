import { useState } from "react"

const Blog = ({ blog, handleLike }) => {

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
          
        </div>
      )
    }
}
    

export default Blog
