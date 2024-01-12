import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleFormChange = (event) => {
    setNewName(event.target.value)
  }

  const AddName = (event) => {
    event.preventDefault()
    const personObj = {name: newName}
    console.log('Add name clicked')
    setPersons(persons.concat(personObj))
    setNewName('')
  }

  const Numbers = ({persons}) => {
    return(
      persons.map((person, i) =>
        <p key={i}> {person.name}</p>  
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddName}>
        <div>
          name: <input value={newName} onChange={handleFormChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
    
  )

}

export default App