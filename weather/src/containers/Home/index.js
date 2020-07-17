import React, { useState, useEffect } from 'react';

import Card from '../../components/CardComponent'
import Clock from '../../components/ClockComponent'
import Timer from '../../components/Timer'

import getWeather from '../../requests/getWeather'

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const enhance = compose(withRouter)

const Home = () => {
  const [ comment, setComment ] = useState(null)
  const [ min, setMin ] = useState(null)
  const [ max, setMax ] = useState(null)
  const [ prec, setPrec ] = useState(null)
  const [ prob, setProb ] = useState(null)
  const [ moon, setMoon ] = useState(null)
  const [ dayIcon, setDayIcon ] = useState(null)
  const [ commentNight, setCommentNight ] = useState(null)
  const [ minNight, setMinNight ] = useState(null)
  const [ maxNight, setMaxNight ] = useState(null)
  const [ precNight, setPrecNight ] = useState(null)
  const [ probNight, setProbNight ] = useState(null)
  const [ moonNight, setMoonNight ] = useState(null)
  const [ nightIcon, setNightIcon ] = useState(null)
  const [ commentNext, setCommentNext ] = useState(null)
  const [ minNext, setMinNext ] = useState(null)
  const [ maxNext, setMaxNext ] = useState(null)
  const [ precNext, setPrecNext ] = useState(null)
  const [ probNext, setProbNext ] = useState(null)
  const [ moonNext, setMoonNext ] = useState(null)
  const [ nextIcon, setNextIcon ] = useState(null)
  const [ seconds, setSeconds ] = useState(10800)
  const [ reseted, setReseted ] = useState(false)


  const handleReset = value => {
    setReseted(value)
    if(value) {
      getWeather()
        .then(value => {
          const forecast = value.DailyForecasts[0]

          setComment(forecast.Day.IconPhrase)
          setMin(forecast.Temperature.Minimum.Value)
          setMax(forecast.Temperature.Maximum.Value)
          setPrec(forecast.Day.RainProbability)
          setProb(forecast.Day.RainProbability)
          setMoon(forecast.Moon)
          setDayIcon(forecast.Day.Icon)

          setCommentNight(forecast.Night.IconPhrase)
          setMinNight(forecast.Temperature.Minimum.Value)
          setMaxNight(forecast.Temperature.Maximum.Value)
          setPrecNight(forecast.Night.RainProbability)
          setProbNight(forecast.Night.RainProbability)
          setMoonNight(forecast.Moon)
          setNightIcon(forecast.Night.Icon)

          setCommentNext(forecast.Day.IconPhrase)
          setMinNext(forecast.Temperature.Minimum.Value)
          setMaxNext(forecast.Temperature.Maximum.Value)
          setPrecNext(forecast.Day.RainProbability)
          setProbNext(forecast.Day.RainProbability)
          setMoonNext(forecast.Moon)
          setNextIcon(forecast.Day.Icon)
        })
    }
  }

  useEffect(() => {
    if (comment === null) {
      getWeather()
        .then(value => {
          const forecast = value.DailyForecasts[0]
          console.log(forecast)

          setComment(forecast.Day.IconPhrase)
          setMin(forecast.Temperature.Minimum.Value)
          setMax(forecast.Temperature.Maximum.Value)
          setPrec(forecast.Day.RainProbability)
          setProb(forecast.Day.RainProbability)
          setMoon(forecast.Moon)
          setDayIcon(forecast.Day.Icon)

          setCommentNight(forecast.Night.IconPhrase)
          setMinNight(forecast.Temperature.Minimum.Value)
          setMaxNight(forecast.Temperature.Maximum.Value)
          setPrecNight(forecast.Night.RainProbability)
          setProbNight(forecast.Night.RainProbability)
          setMoonNight(forecast.Moon)
          setNightIcon(forecast.Night.Icon)

          setCommentNext(forecast.Day.IconPhrase)
          setMinNext(forecast.Temperature.Minimum.Value)
          setMaxNext(forecast.Temperature.Maximum.Value)
          setPrecNext(forecast.Day.RainProbability)
          setProbNext(forecast.Day.RainProbability)
          setMoonNext(forecast.Moon)
          setNextIcon(forecast.Day.Icon)
        })

      // if (handleReset === false) {
      //   console.log('hello')
      //   forecast()
      // }
    }
  }, [comment, min, max, prec, prob, moon, seconds])
  return (
    <div className="home">
        <Clock />
      <div className="card-container">
        <Card
          period = "Hoje"
          cityName = "São Paulo"
          weatherState = { comment }
          minTemp = { min }
          maxTemp = { max }
          rainPrec = { prec }
          rainProb = { prob }
          moon = { moon }
          icon = { dayIcon }
        />
        <Card
          period = "12h"
          cityName = "São Paulo"
          weatherState = { commentNight }
          minTemp = { minNight }
          maxTemp = { maxNight }
          rainPrec = { precNight }
          rainProb = { probNight }
          icon = { nightIcon }
        />
        <Card
          period = "24h"
          cityName = "São Paulo"
          weatherState = { commentNext }
          minTemp = { minNext }
          maxTemp = { maxNext }
          rainPrec = { precNext }
          rainProb = { probNext }
          icon = { nextIcon }
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

export default enhance(Home)
