const Course = ({course}) => {
  const id = course.id
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

const Header = ({name}) => {
  return <h1>{name}</h1>
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
  const course = {
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
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App