import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import weather from './services/weather'

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

const Content = ({filter, countries, setFilter, weather, setWeather}) => {
  if (filter) {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    if (filtered.length === 1) {
      return(
      <Country country={filtered[0]} weather={weather} />
      )
    } else if (filtered.length <= 10) {
      return(
        filtered.map(country =>
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>
              show
            </button>
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

  const [weather, setWeather] = useState(null)
  const [icon, setIcon] = useState(null)

  useEffect( () => {
    weatherService
      .getWeather(country.capital)
        .then(response => {
          console.log('response', response)
          setWeather(response)
          const iconID = response.weather[0].icon
          setIcon(iconID)
        })
  }, [country.capital])

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
      <Weather country={country} weather={weather} setWeather={setWeather} icon={icon} />

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

const Weather = ({country, weather, icon}) => {
  if (!weather) {
    return(
    <div>
      <p>Loading weather...</p>
    </div>
    )
  } else {
    return(
      <div>
        <h2>
          Weather in {country.capital}
        </h2>
        <p>
          temperature {(weather.main.temp - 272.15).toFixed(1)} celcius
        </p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
        <p>
          wind {weather.wind.speed} m/s
        </p>
      </div>
    )
  }
  
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
      <Content filter={filter} countries={countries} setFilter={setFilter} />
    </div>
  )
}

export default App
