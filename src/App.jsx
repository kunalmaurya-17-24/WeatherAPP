import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { Oval } from 'react-loader-spinner'

function App() {
  const [input, setInput] = useState("")

  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  })

  const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December",
  ];

  const toDate = () => {
    const currentDate = new Date();
    return `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  }

  const search = (event) => {
    if (event.key === "Enter") {
      setInput('')
      setWeather({ ...weather, loading: true })
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: "metric",
          appid: "a6d1c8472ecb00fe098a465739a3c29e"
        }
      }).then(res => {
        console.log(res)
        setWeather({ data: res.data, loading: false, error: false })
      }).catch(err => {
        setWeather({ ...weather, data: {}, error: true })
      })
    }
  }

  return (
    <div className='App'>
      <div className='weather-app'>
        <div className='city-search'>
          <input
            type="text"
            className='city'
            placeholder='Enter City Name...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {
          weather.loading && (
            <Oval type="Oval" color='green' height={70} width={70} />
          )
        }
        {
          weather.error && (
            <div className='error-message'>
              <span>City Not Found</span>
            </div>
          )
        }
        {
          weather && weather.data && weather.data.main && (
            <div>
              <div className='city-name'>
                <h2>{weather.data.name},
                  <span>{weather.data.sys.country}</span>
                </h2>
              </div>
              <div className='date'>
                <span>{toDate()}</span>
              </div>
              <div className='icon-temp'>
                <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
                {Math.round(weather.data.main.temp)}
                <sup className='deg'>°C</sup>
              </div>
              <div className='des-wind'>
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed} m/s</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
