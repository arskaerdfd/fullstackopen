import { useEffect, useState } from 'react'
import axios from 'axios'


const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const handleNameFormChange = (event) => {    
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {    
    setNewNumber(event.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObj = {name: newName, number: newNumber}
      console.log('Add name clicked', personObj)

      axios
        .post('http://localhost:3001/persons', personObj)
        .then(response => {
          setPersons(persons.concat(personObj))
          setNewName('')
          setNewNumber('')
        })
    } 
  }

  return (
    <div>
      <form onSubmit={AddPerson}>
        <div> name: <input value={newName} onChange={handleNameFormChange} /> </div>    
        <div> number: <input value={newNumber} onChange={handleNumberFormChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
    </div>
  )
}

const Filter = ({filter, setNewFilter}) => {

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return(
    <div> filter shown with <input value={filter} onChange={handleFilterChange}/> </div>
  )
}

const Phonebook = ({persons, filter}) => {
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log('promise done', response)
        setPersons(response.data)
        })
    
  }, [])
  

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Phonebook persons={persons} filter={filter} />
    </div>
    
  )

}

export default App