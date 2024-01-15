import axios from "axios"
const api_key = import.meta.env.VITE_SOME_KEY

const getWeatherCoord = (lat, lon) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
}

const getWeather = (cityName) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`)

  return (
    request
      .then(response =>
        getWeatherCoord(response.data[0].lat,response.data[0].lon)
          .then(response => response.data))
  )
}


export default {getWeather}