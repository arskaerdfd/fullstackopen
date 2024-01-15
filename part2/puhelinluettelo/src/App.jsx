import { useEffect, useState } from 'react'
import personService from './services/persons'


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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const newPersonObj = {name: newName, number: newNumber}
        const oldPersonObj = persons.find(person => person.name === newName)
        console.log('newPersonObj', newPersonObj)
        console.log('oldPersonObj', oldPersonObj)
        
        personService
          .update(oldPersonObj.id, newPersonObj)
          .then(updatedPerson =>
            setPersons(persons.map(person => person.id !== oldPersonObj.id ? person : updatedPerson.data)))
      }   
    } else {
      const personObj = {name: newName, number: newNumber}
      console.log('Add name clicked', personObj)

      personService
        .create(personObj)
        .then(addedPerson => {
          console.log(addedPerson)
          setPersons(persons.concat(addedPerson.data))
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

const Phonebook = ({persons, setPersons, filter}) => {

  if (!filter) {
    return(
      persons.map(person =>
        <Person 
          key={person.id} 
          person={person} 
          persons={persons} 
          setPersons={setPersons} />
      )
    )
  } else {
    return(
      persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
        ).map(person =>
          <Person 
            key={person.id} 
            person={person} 
            persons={persons} 
            setPersons={setPersons} />
          )
    )
  } 
}

const Person = ({ person, persons, setPersons }) => {
  
  const deleteNumber = () => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .deleteObj(person.id)
      .then(response =>
        setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deleteNumber}>delete</button>
      </p>
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect( () => {
    personService
      .getAll()
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
      <Phonebook persons={persons} setPersons={setPersons} filter={filter} />
    </div>
    
  )

}

export default App