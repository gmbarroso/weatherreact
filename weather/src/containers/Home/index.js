import React, { useState, useEffect } from 'react';

import Card from '../../components/CardComponent'

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const enhance = compose(withRouter)

const Home = () => {
  const [ firstCity, setFirstCity ] = useState(null);

  const transformResult = (result) => {
    const { DailyForecasts } = result
    const forecast = DailyForecasts[0]
    // const hasPrecipitation = () => {
    //   const day = forecast.Day.HasPrecipitation ? true : false
      
    //   return day
    // 

    let firstCityForecast = {
      comment: forecast.Day.IconPhrase,
      min: forecast.Temperature.Minimum.Value,
      max: forecast.Temperature.Maximum.Value,
    }
    
    return firstCityForecast
  }

  useEffect(() => {
    const token = 'IuVWje9ULZCICrZhuBv4PCuLF4sGEX6P'
    const br = 'pt-br'
    const metric = 'true'
    const location = '45881'
    const forecast = async () => {
      const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=${token}&language=${br}&metric=${metric}`)
      return result.json()
    }

    if (firstCity === null) {
      const result = forecast()
      result.then(value => {
        setFirstCity(transformResult(value))
      })
    }
  }, [firstCity])

  console.log('lalalalala', firstCity)
  return (
    <div className="home">
      <div className="card-container">
        <Card
          cityName = "São Paulo"
          // weatherState = { firstCity.comment }
          // minTemp = { firstCity.min }
          // maxTemp = { firstCity.max }
          rainPrec = "25"
          rainProb = "67"
        />
        <Card
          cityName = ''
        />
        <Card
          cityName = ''
        />
      </div>
    </div>
  )
}

export default enhance(Home)
