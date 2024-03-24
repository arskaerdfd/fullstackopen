const Blog = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog => {
        return <p key={blog.id}>{blog.title} {blog.author}</p>})}
    </div>
  )}

export default Blog
