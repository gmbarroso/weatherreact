import React, { useState, useEffect } from 'react';

import Card from '../../components/CardComponent'
import Timer from '../../components/Timer'

import getHourly from '../../requests/getHourly'
import getTwelve from '../../requests/getTwelve'
import getNextDayWeather from '../../requests/getNextDayWeather'

import {
  withRouter,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const weatherObject = {
  comment: null,
  max: null,
  min: null,
  prec: null,
  prob: null,
  dayIcon: null
}

const Home = () => {
  const [ hourly, setHourly ] = useState(weatherObject)
  const [ twelve, setTwelve ] = useState(weatherObject)
  const [ nextDay, setNextDay ] = useState(weatherObject)
  const [ seconds, setSeconds ] = useState(10800)


  const handleReset = value => {
    if(value) {
      getHourly()
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
      
      getTwelve()
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
      
      getNextDayWeather()
        .then(value => {
          const forecast = value.DailyForecasts[1]

          setNextDay({
            comment: forecast.Day.IconPhrase,
            max: forecast.Temperature.Maximun.Value,
            min: forecast.Temperature.Minimum.Value,
            prec: forecast.Day.Rain.Value,
            prob: forecast.Day.PrecipitationProbability,
            dayIcon: forecast.Day.Icon
          })
        })
    }

    return true
  }

  useEffect(() => {
    if (hourly.comment === null) {
      getHourly()
        .then(value => {
          const forecast = value[0]
          
          setHourly({
            comment: forecast.IconPhrase,
            max: forecast.Temperature.Value,
            prec: forecast.Rain.Value,
            prob: forecast.PrecipitationProbability,
            dayIcon: forecast.WeatherIcon
          })
          console.log(forecast)
        })
      
        getTwelve()
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
      
      getNextDayWeather()
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
  }, [hourly])
  return (
    <div className="home">
      <div className="card-container">
        <Card
          period = "Agora"
          cityName = "São Paulo"
          weatherState = { hourly.comment }
          maxTemp = { hourly.max }
          rainPrec = { hourly.prprec }
          rainProb = { hourly.prob }
          icon = { hourly.dayIcon }
        />
        <Card
          period = " Próximas 12h"
          cityName = "São Paulo"
          weatherState = { twelve.comment }
          maxTemp = { twelve.max }
          rainPrec = { twelve.prprec }
          rainProb = { twelve.prob }
          icon = { twelve.dayIcon }
        />
        <Card
          period = "Amanhã"
          cityName = "São Paulo"
          weatherState = { nextDay.comment }
          minTemp = { nextDay.min }
          maxTemp = { nextDay.max }
          rainPrec = { nextDay.prprec }
          rainProb = { nextDay.prob }
          icon = { nextDay.dayIcon }
        />
      </div>
      <div>
        <Timer
          isReseted = { handleReset }
          seconds = { seconds }
          disabled = { false }
        />
      </div>
      <div className="source">Source: <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a></div>
    </div>
  )
}

export default withRouter(Home)
