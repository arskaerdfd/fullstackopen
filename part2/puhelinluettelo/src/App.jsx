import { useEffect, useState } from 'react'
import personService from './services/persons'
import PositiveNotification from '../components/PositiveNotification'
import PersonForm from '../components/PersonForm'
import Filter from '../components/Filter'
import Phonebook from '../components/Phonebook'
import NegativeNotification from '../components/NegativeNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [PositiveMessage, setPositiveMessage] = useState(null)
  const [NegativeMessage, setNegativeMessage] = useState(null)

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
      <PositiveNotification message={PositiveMessage} />
      <NegativeNotification message={NegativeMessage} />
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setPositiveMessage={setPositiveMessage}
        setNegativeMessage={setNegativeMessage}
        personService={personService}
      />
      <h3>Numbers</h3>
      <Phonebook 
        persons={persons} 
        setPersons={setPersons} 
        filter={filter} 
        setPositiveMessage={setPositiveMessage}
        setNegativeMessage={setNegativeMessage}
        personService={personService}
      />
    </div>
    
  )

}

export default App