const AllCourses = ({courses}) => {

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

    console.log('Courses', courses)
    return(
      courses.map(course =>
        <Course key={course.id} course={course} />)
    )
  }

export default AllCourses

  
  