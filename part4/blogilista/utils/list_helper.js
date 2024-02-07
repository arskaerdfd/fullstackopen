const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((maxBlog, currentBlog) => {
    return maxBlog.likes > currentBlog.likes ? maxBlog : currentBlog
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const authorCounts = {}

  if (blogs.length === 0) {
    return null
  }


  blogs.forEach(blog => {
    const author = blog.author
    if (authorCounts[author]) {
      authorCounts[author]++
    } else {
      authorCounts[author] = 1
    }
  })


  let mostBlogsAuthor = ''
  let maxBlogs = 0
  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      mostBlogsAuthor = author
      maxBlogs = authorCounts[author]
    }
  }


  return {
    author: mostBlogsAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  const authorCounts = {}

  if (blogs.length === 0) {
    return null
  }


  blogs.forEach(blog => {
    const author = blog.author
    const likes = blog.likes
    if (authorCounts[author]) {
      authorCounts[author] += likes
    } else {
      authorCounts[author] = likes
    }
  })


  let mostLikesAuthor = ''
  let maxLikes = 0
  for (const author in authorCounts) {
    if (authorCounts[author] > maxLikes) {
      mostLikesAuthor = author
      maxLikes = authorCounts[author]
    }
  }


  return {
    author: mostLikesAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}