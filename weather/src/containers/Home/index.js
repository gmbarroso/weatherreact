import React, { useState, useEffect } from 'react';

import Card from '../../components/CardComponent'
import Clock from '../../components/ClockComponent'
import Timer from '../../components/Timer'

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
  const [ seconds, setSeconds ] = useState(10800)
  const [ reseted, setReseted ] = useState(false)

  const token = ''
  const br = 'pt-br'
  const details = 'true'
  const metric = 'true'
  const location = '45881'
  const forecast = async () => {
    // const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${token}&language=${br}&details=${details}&metric=${metric}`)
    // return result.json()
    return console.log('Batida')
  }

  const handleReset = value => {
    console.log('reset', reseted)
    console.log('value', value)
    return setReseted(value)
  }

  useEffect(() => {
    if (comment === null) {
      const result = forecast()
      result.then(value => {
        // const forecast = value.DailyForecasts[0]

        // console.log(forecast)

        // setComment(forecast.Day.IconPhrase)
        // setMin(forecast.Temperature.Minimum.Value)
        // setMax(forecast.Temperature.Maximum.Value)
        // setPrec(forecast.Day.RainProbability)
        // setProb(forecast.Day.RainProbability)
        // setMoon(forecast.Moon)
        setReseted(true)
      })

      // if (handleReset === false) {
      //   console.log('hello')
      //   forecast()
      // }
    }
  }, [comment, min, max, prec, prob])
  return (
    <div className="home">
        <Clock />
      <div className="card-container">
        <Card
          cityName = "São Paulo"
          weatherState = { comment }
          minTemp = { min }
          maxTemp = { max }
          rainPrec = { prec }
          rainProb = { prob }
          moon = { moon }
        />
        <Card
          cityName = "São Paulo"
          weatherState = { comment }
          minTemp = { min }
          maxTemp = { max }
          rainPrec = { prec }
          rainProb = { prob }
        />
        <Card
          cityName = "São Paulo"
          weatherState = { comment }
          minTemp = { min }
          maxTemp = { max }
          rainPrec = { prec }
          rainProb = { prob }
        />
      </div>
      <div>
        <Timer
          isReseted = { handleReset }
          seconds = { seconds }
          available = { true }
        />
      </div>
    </div>
  )
}

export default enhance(Home)
