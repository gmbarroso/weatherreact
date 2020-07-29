import React, { useState, useEffect, Fragment } from 'react';

import {
  Card,
  Timer,
  Alert
} from '../../components'

import {
  getHourly,
  getTwelve,
  getNextDayWeather,
  getUserLocation,
  getDayWeather
} from '../../requests'

import {
  useGeolocation,
  useDarkTheme
} from '../../hooks'

import {
  withRouter,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import './toggleButtonStyle.css'

const weatherObject = {
  cityName: null,
  comment: null,
  max: null,
  min: null,
  prec: null,
  prob: null,
  dayIcon: null
}

const geoLocationOptions = {
  timeout: 1000 * 60 * 1 // 1 minute
}

const Home = () => {
  const { latitude, longitude, error } = useGeolocation(geoLocationOptions)
  const [ hourly, setHourly ] = useState(weatherObject)
  const [ twelve, setTwelve ] = useState(weatherObject)
  const [ nextDay, setNextDay ] = useState(weatherObject)
  const [ seconds, setSeconds ] = useState(10800)
  const [ isChecked, setChecked ] = useState(false)
  const [ showAlert, setShowAlert] = useState(false)
  
  const showError = () => alert(error)
  
  useDarkTheme(isChecked)

  const handleReset = value => {
    setShowAlert(true)
    if(value) {
      getUserLocation(latitude, longitude)
      .then(location => {
        if(location) {
          const key = location.Key
          getHourly(key)
            .then(value => {
              const forecast = value[0]
              
              setHourly({
                comment: forecast.IconPhrase,
                max: forecast.Temperature.Value,
                prec: forecast.Rain.Value,
                prob: forecast.PrecipitationProbability,
                dayIcon: forecast.WeatherIcon
              })
            })

          getTwelve(key)
            .then(value => {
              const forecast = value[11]

              setTwelve({
                comment: forecast.IconPhrase,
                max: forecast.Temperature.Value,
                prec: forecast.Rain.Value,
                prob: forecast.PrecipitationProbability,
                dayIcon: forecast.WeatherIcon
              })
            })
          
          getNextDayWeather(key)
            .then(value => {
              const forecast = value.DailyForecasts[1]
              
              setNextDay({
                comment: forecast.Day.IconPhrase,
                max: forecast.Temperature.Maximum.Value,
                min: forecast.Temperature.Minimum.Value,
                prec: forecast.Day.Rain.Value,
                prob: forecast.Day.PrecipitationProbability,
                dayIcon: forecast.Day.Icon
              })
            })
        }
      })
    }
    return true
  }

  const handleClick = () => setChecked(!isChecked)

  useEffect(() => {
    if (hourly.comment === null) {
      getUserLocation(latitude, longitude)
        .then(location => {
          if(location) {
            const key = location.Key
            getHourly(key)
              .then(value => {
                const forecast = value[0]
                getDayWeather(key)
                  .then(value => {
                    const minimum = value.DailyForecasts[0].Temperature.Minimum.Value

                    setHourly({
                      comment: forecast.IconPhrase,
                      min: minimum,
                      max: forecast.Temperature.Value,
                      prec: forecast.Rain.Value,
                      prob: forecast.PrecipitationProbability,
                      dayIcon: forecast.WeatherIcon
                    })
                })
              })

            getTwelve(key)
              .then(value => {
                const forecast = value[11]
                
                setTwelve({
                  comment: forecast.IconPhrase,
                  max: forecast.Temperature.Value,
                  prec: forecast.Rain.Value,
                  prob: forecast.PrecipitationProbability,
                  dayIcon: forecast.WeatherIcon
                })
              })

            getNextDayWeather(key)
              .then(value => {
                const forecast = value.DailyForecasts[1]

                setNextDay({
                  comment: forecast.Day.IconPhrase,
                  max: forecast.Temperature.Maximum.Value,
                  min: forecast.Temperature.Minimum.Value,
                  prec: forecast.Day.Rain.Value,
                  prob: forecast.Day.PrecipitationProbability,
                  dayIcon: forecast.Day.Icon
                })
              })
          }
        })
    }
  }, [hourly, latitude, longitude])
  return (
    <Fragment>
      <Alert
        showAlert = { showAlert }
        message = "Informações de clima atualizados com sucesso"
      />
      <div className="toggleDiv">
        <span>Mudar Tema:</span>
        <label className="switch">
          <input onChange={handleClick} checked={isChecked} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="home">
        <div className="card-container">
          <Card
            period = "Agora"
            cityName = "São Paulo"
            weatherState = { hourly.comment }
            minTemp = { hourly.min }
            maxTemp = { hourly.max }
            rainPrec = { hourly.prec }
            rainProb = { hourly.prob }
            icon = { hourly.dayIcon }
          />
          <Card
            period = " Próximas 12h"
            cityName = "São Paulo"
            weatherState = { twelve.comment }
            minTemp = { nextDay.min }
            maxTemp = { twelve.max }
            rainPrec = { twelve.prec }
            rainProb = { twelve.prob }
            icon = { twelve.dayIcon }
          />
          <Card
            period = "Amanhã"
            cityName = "São Paulo"
            weatherState = { nextDay.comment }
            minTemp = { nextDay.min }
            maxTemp = { nextDay.max }
            rainPrec = { nextDay.prec }
            rainProb = { nextDay.prob }
            icon = { nextDay.dayIcon }
          />
        </div>
        <div>
          <Timer
            isReseted = { handleReset }
            seconds = { seconds }
            disabled = { false }
            alert = { showAlert }
          />
        </div>
        <div className="source">Source: <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a></div>
        {error && 
          showError()
        }
      </div>
    </Fragment>
  )
}

export default withRouter(Home)
