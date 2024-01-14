import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNameFormChange = (event) => {    
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {    
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObj = {name: newName, number: newNumber}
      console.log('Add name clicked', personObj)
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    } 
  }

  const Phonebook = ({persons}) => {
    if (!filter) {
      return(
        persons.map(person =>
          <p key={person.name}> {person.name} {person.number}</p>  
        )
      )
    } else {
      return(
        persons.filter(person => 
          person.name.toLowerCase().includes(filter.toLowerCase())
          ).map(person =>
              <p key={person.name}> {person.name} {person.number}</p>  
            )
      )
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with <input value={filter} onChange={handleFilterChange}/> </div>
      <h2>Add a new</h2>
      <form onSubmit={AddPerson}>
        <div> name: <input value={newName} onChange={handleNameFormChange} /> </div>    
        <div> number: <input value={newNumber} onChange={handleNumberFormChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
    
  )

}

export default App