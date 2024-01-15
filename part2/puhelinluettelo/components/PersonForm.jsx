const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setPositiveMessage, personService, setNegativeMessage }) => {

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
            .then(updatedPerson =>{
              setPersons(persons.map(person => person.id !== oldPersonObj.id ? person : updatedPerson.data))
              setPositiveMessage(`Changed the number of ${updatedPerson.data.name}`)
              setTimeout(() => setPositiveMessage(null), 5000)
            })
            .catch(error => {
              setNegativeMessage(`Information of ${oldPersonObj.name} has already been removed from the server`)
              setTimeout(() => setNegativeMessage(null), 5000)
            })
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
            setPositiveMessage(`Added ${addedPerson.data.name}`)
            setTimeout(() => setPositiveMessage(null), 5000)
          })
          .catch(error => {
            setNegativeMessage(`Failed adding ${personObj.name}`)
            setTimeout(() => setNegativeMessage(null), 5000)
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
export default PersonForm  