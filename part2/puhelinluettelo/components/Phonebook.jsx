import Person from "./Person"

const Phonebook = ({persons, setPersons, filter, setPositiveMessage, personService, setNegativeMessage}) => {

    if (!filter) {
      return(
        persons.map(person =>
          <Person 
            key={person.id} 
            person={person} 
            persons={persons} 
            setPersons={setPersons}
            setPositiveMessage={setPositiveMessage}
            personService={personService}
            setNegativeMessage={setNegativeMessage}
          />
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
              setPersons={setPersons}
              setPositiveMessage={setPositiveMessage}
              personService={personService}
              setNegativeMessage={setNegativeMessage}
            />
            )
      )
    } 
  }
export default Phonebook