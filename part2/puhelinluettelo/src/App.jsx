import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameFormChange = (event) => {    
    setNewName(event.target.value)
  }

  const handlePhoneFormChange = (event) => {    
    setNewNumber(event.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObj = {name: newName, phone: newNumber}
      console.log('Add name clicked', personObj)
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    } 
  }

  const Phonebook = ({persons}) => {
    return(
      persons.map((person, i) =>
        <p key={person.name}> {person.name} {person.phone}</p>  
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameFormChange} />
        </div>    
        <div>
          number: <input value={newNumber} onChange={handlePhoneFormChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
    
  )

}

export default App