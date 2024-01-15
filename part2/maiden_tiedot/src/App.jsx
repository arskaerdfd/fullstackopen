import { useEffect, useState } from 'react'
import countryService from './services/countries'

const Filter = ({filter, setFilter}) => {

  const handleFilter = (event) => {
      setFilter(event.target.value)
  }

  return(
    <p>
      Find countries
      <input value={filter} onChange={handleFilter}></input>
    </p>
  )
}

const Content = ({filter, countries}) => {
  if (filter) {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    if (filtered.length === 1) {
      return(
      <Country country={filtered[0]} />
      )
    } else if (filtered.length <= 10) {
      return(
        filtered.map(country =>
          <p key={country.name.common}>
            {country.name.common}
            <button>show</button>
          </p>)
      )
    } else {
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
  }
}
const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital}<br></br>
        Area {country.area}
      </p>

      <h2>languages:</h2>
      <Languages languages={country.languages} />
      <img src={`${country.flags.png}`}></img>

    </div>
  )
}

const Languages = ({languages}) => {
  return (
    <ul>
      {Object.values(languages).map(language =>(
        <li key={language}>
          {language}
        </li>
      ))}
    </ul>
  )
}


const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect( () => {
    countryService
      .getAll()
      .then(response =>{
        setCountries(response.data)
      })
    
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Content filter={filter} countries={countries} />
    </div>
  )
}

export default App
