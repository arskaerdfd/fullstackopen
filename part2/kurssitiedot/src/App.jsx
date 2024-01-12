const Course = ({course}) => {
  const name = course.name
  const parts = course.parts
  const exerciseSum = parts.map(part => part.exercises).reduce((acc, num) => acc + num, 0)
  console.log({exerciseSum});
  
  return(
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={exerciseSum} />
    </div>
    
  )
}

const AllCourses = ({courses}) => {
  console.log('Courses', courses)
  return(
    courses.map(course =>
      <Course key={course.id} course={course} />)
  )
}

const Header = ({name}) => {
  return <h2>{name}</h2>
}

const Part = ({name, exercise}) => {
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part =>
      <Part key={part.id} name={part.name} exercise={part.exercises} />
      )
  )
}

const Total = ({sum}) => {
  return <b>Total of {sum} exercises</b>
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <AllCourses courses={courses} />
    </div>
  )
}

export default App