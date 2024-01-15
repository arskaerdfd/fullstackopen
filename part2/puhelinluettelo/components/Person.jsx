const Person = ({ person, persons, setPersons, setPositiveMessage, personService, setNegativeMessage }) => {
  
    const deleteNumber = () => {
      
      if (window.confirm(`Delete ${person.name}`)) {
        personService
        .deleteObj(person.id)
        .then(response =>{
          setPersons(persons.filter(p => p.id !== person.id))
          setPositiveMessage(`Deleted ${person.name}`)
          setTimeout(() => setPositiveMessage(null), 5000)
        })
        .catch(error => {
          setNegativeMessage(`Failed deleting ${person.name}`)
          setTimeout(() => setNegativeMessage(null), 5000)
        })
        
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

  export default Person
  