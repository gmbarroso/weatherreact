import React, { useState, useEffect } from 'react';

import Card from '../../components/CardComponent'
import Timer from '../../components/Timer'

import getHourly from '../../requests/getHourly'
import getTwelve from '../../requests/getTwelve'
import getFiveDaysWeather from '../../requests/getFiveDaysWeather'

import {
  withRouter,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Home = () => {
  const [ comment, setComment ] = useState(null)
  const [ max, setMax ] = useState(null)
  const [ prec, setPrec ] = useState(null)
  const [ prob, setProb ] = useState(null)
  const [ dayIcon, setDayIcon ] = useState(null)
  const [ commentNight, setCommentNight ] = useState(null)
  const [ maxNight, setMaxNight ] = useState(null)
  const [ precNight, setPrecNight ] = useState(null)
  const [ probNight, setProbNight ] = useState(null)
  const [ nightIcon, setNightIcon ] = useState(null)
  const [ commentNextDay, setCommentNextDay ] = useState(null)
  const [ minNextDay, setMinNextDay ] = useState(null)
  const [ maxNextDay, setMaxNextDay ] = useState(null)
  const [ precNextDay, setPrecNextDay ] = useState(null)
  const [ probNextDay, setProbNextDay ] = useState(null)
  const [ nextDayIcon, setNextDayIcon ] = useState(null)
  const [ seconds, setSeconds ] = useState(10800)
  const [ reseted, setReseted ] = useState(false)


  const handleReset = value => {
    setReseted(value)
    if(value) {
      getHourly()
        .then(value => {
          const forecast = value[0]

          setComment(forecast.IconPhrase)
          setMax(forecast.Temperature.Value)
          setPrec(forecast.Rain.Value)
          setProb(forecast.PrecipitationProbability)
          setDayIcon(forecast.WeatherIcon)
        })
      
      getTwelve()
        .then(value => {
          const forecast = value[11]

          setCommentNight(forecast.IconPhrase)
          setMaxNight(forecast.Temperature.Value)
          setPrecNight(forecast.Rain.Value)
          setProbNight(forecast.PrecipitationProbability)
          setNightIcon(forecast.WeatherIcon)
        })
    }
  }

  useEffect(() => {
    if (comment === null) {
      getHourly()
        .then(value => {
          const forecast = value[0]

          setComment(forecast.IconPhrase)
          setMax(forecast.Temperature.Value)
          setPrec(forecast.Rain.Value)
          setProb(forecast.PrecipitationProbability)
          setDayIcon(forecast.WeatherIcon)
        })
      
      getTwelve()
        .then(value => {
          const forecast = value[11]
          
          setCommentNight(forecast.IconPhrase)
          setMaxNight(forecast.Temperature.Value)
          setPrecNight(forecast.Rain.Value)
          setProbNight(forecast.PrecipitationProbability)
          setNightIcon(forecast.WeatherIcon)
        })
      
      getFiveDaysWeather()
        .then(value => {
          const forecast = value.DailyForecasts[1]

          setCommentNextDay(forecast.Day.IconPhrase)
          setMinNextDay(forecast.Temperature.Minimum.Value)
          setMaxNextDay(forecast.Temperature.Maximum.Value)
          setPrecNextDay(forecast.Day.Rain.Value)
          setProbNextDay(forecast.Day.PrecipitationProbability)
          setNextDayIcon(forecast.Day.Icon)
        })

      // if (handleReset === false) {
      //   console.log('hello')
      //   forecast()
      // }
    }
  }, [comment, max, prec, prob, seconds])
  return (
    <div className="home">
      <div className="card-container">
        <Card
          period = "Agora"
          cityName = "São Paulo"
          weatherState = { comment }
          maxTemp = { max }
          rainPrec = { prec }
          rainProb = { prob }
          icon = { dayIcon }
        />
        <Card
          period = "12h"
          cityName = "São Paulo"
          weatherState = { commentNight }
          maxTemp = { maxNight }
          rainPrec = { precNight }
          rainProb = { probNight }
          icon = { nightIcon }
        />
        <Card
          period = "24h"
          cityName = "São Paulo"
          weatherState = { commentNextDay }
          minTemp = { minNextDay }
          maxTemp = { maxNextDay }
          rainPrec = { precNextDay }
          rainProb = { probNextDay }
          icon = { nextDayIcon }
        />
      </div>
      <div>
        <Timer
          isReseted = { handleReset }
          seconds = { seconds }
          disabled = { false }
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
