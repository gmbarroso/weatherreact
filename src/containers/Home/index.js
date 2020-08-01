import React, { useState, useEffect, Fragment } from 'react';

import {
  Card,
  Timer,
  Alert,
  Flags,
  // LocationButtons
} from '../../components'

import {
  getHourly,
  getTwelve,
  getNextDayWeather,
  getUserLocation,
  getDayWeather,
} from '../../requests'

import {
  useGeolocation,
  useDarkTheme
} from '../../hooks'

import {
  withRouter,
} from 'react-router-dom'

import { useTranslation } from 'react-i18next';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import './toggleButtonStyle.css'

const weatherObject = {
  cityName: null,
  neighborhood: null,
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

const Home = props => {
  const { latitude, longitude, locationError } = useGeolocation(geoLocationOptions)
  const [ hourly, setHourly ] = useState(weatherObject)
  const [ twelve, setTwelve ] = useState(weatherObject)
  const [ nextDay, setNextDay ] = useState(weatherObject)
  const [ isChecked, setChecked ] = useState(false)
  const [ showAlert, setShowAlert ] = useState(false)  
  const [ error, setError ] = useState(null)
  const showLocationError = () => alert(locationError)
  const { t, i18n } = useTranslation('common')
  
  useDarkTheme(isChecked)

  const handleReset = value => {
    if(value) {
      getUserLocation(latitude, longitude)
      .then(location => {
        console.log(location)
        if(location) {
          const key = location.Key
          getHourly(key, i18n.language)
          .then(value => {
            const forecast = value[0]
            getDayWeather(key, i18n.language)
              .then(value => {
                const minimum = value.DailyForecasts[0].Temperature.Minimum.Value

                setHourly({
                  cityName: location.ParentCity.EnglishName,
                  neighborhood: location.LocalizedName,
                  comment: forecast.IconPhrase,
                  min: minimum,
                  max: forecast.Temperature.Value,
                  prec: forecast.Rain.Value,
                  prob: forecast.PrecipitationProbability,
                  dayIcon: forecast.WeatherIcon
                })
            })
          })

          getTwelve(key, i18n.language)
            .then(value => {
              const forecast = value[11]

              setTwelve({
                cityName: location.ParentCity.EnglishName,
                neighborhood: location.LocalizedName,
                comment: forecast.IconPhrase,
                max: forecast.Temperature.Value,
                prec: forecast.Rain.Value,
                prob: forecast.PrecipitationProbability,
                dayIcon: forecast.WeatherIcon
              })
            })
          
          getNextDayWeather(key, i18n.language)
            .then(value => {
              const forecast = value.DailyForecasts[1]
              
              setNextDay({
                cityName: location.ParentCity.EnglishName,
                neighborhood: location.LocalizedName,
                comment: forecast.Day.IconPhrase,
                max: forecast.Temperature.Maximum.Value,
                min: forecast.Temperature.Minimum.Value,
                prec: forecast.Day.Rain.Value,
                prob: forecast.Day.PrecipitationProbability,
                dayIcon: forecast.Day.Icon
              })
            })
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)
        }
      })
      .catch(errorMessage => errorMessage ? setError(true) : setError(false))
    }
  }

  const handleClick = () => setChecked(!isChecked)

  useEffect(() => {
    if (hourly.comment === null) {
      getUserLocation(latitude, longitude)
        .then(location => {
          if(location) {
            const key = location.Key
            getHourly(key, i18n.language)
              .then(value => {
                const forecast = value[0]
                getDayWeather(key, i18n.language)
                  .then(value => {
                    const minimum = value.DailyForecasts[0].Temperature.Minimum.Value

                    setHourly({
                      cityName: location.ParentCity.EnglishName,
                      neighborhood: location.LocalizedName,
                      comment: forecast.IconPhrase,
                      min: minimum,
                      max: forecast.Temperature.Value,
                      prec: forecast.Rain.Value,
                      prob: forecast.PrecipitationProbability,
                      dayIcon: forecast.WeatherIcon
                    })
                })
              })

            getTwelve(key, i18n.language)
              .then(value => {
                const forecast = value[11]
                
                setTwelve({
                  cityName: location.ParentCity.EnglishName,
                  neighborhood: location.LocalizedName,
                  comment: forecast.IconPhrase,
                  max: forecast.Temperature.Value,
                  prec: forecast.Rain.Value,
                  prob: forecast.PrecipitationProbability,
                  dayIcon: forecast.WeatherIcon
                })
              })

            getNextDayWeather(key, i18n.language)
              .then(value => {
                const forecast = value.DailyForecasts[1]

                setNextDay({
                  cityName: location.ParentCity.EnglishName,
                  neighborhood: location.LocalizedName,
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
        .catch(errorMessage => errorMessage ? setError(true) : setError(false))

    }
  }, [hourly, latitude, longitude])
  return (
    <Fragment>
      <div className="topContainer">
        <div className="toggleDiv">
          <span>{t('home.changeTheme')}</span>
          <label className="switch">
            <input onChange={handleClick} checked={isChecked} type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        {/* <LocationButtons /> */}
        <Flags language = { props.lang } />
      </div>
      <div className="home">
        <div className="card-container">
          <Card
            period = { t('cards.now') }
            cityName = { hourly.cityName }
            neighborhood = { hourly.neighborhood }
            weatherState = { hourly.comment }
            minTemp = { hourly.min }
            maxTemp = { hourly.max }
            rainPrec = { hourly.prec }
            rainProb = { hourly.prob }
            icon = { hourly.dayIcon }
            error = { error }
          />
          <Card
            period = { t('cards.nextTwelve') }
            cityName = { twelve.cityName }
            neighborhood = { hourly.neighborhood }
            weatherState = { twelve.comment }
            minTemp = { nextDay.min }
            maxTemp = { twelve.max }
            rainPrec = { twelve.prec }
            rainProb = { twelve.prob }
            icon = { twelve.dayIcon }
            error = { error }
          />
          <Card
            period = { t('cards.tomorrow') }
            cityName = { nextDay.cityName }
            neighborhood = { hourly.neighborhood }
            weatherState = { nextDay.comment }
            minTemp = { nextDay.min }
            maxTemp = { nextDay.max }
            rainPrec = { nextDay.prec }
            rainProb = { nextDay.prob }
            icon = { nextDay.dayIcon }
            error = { error }
          />
        </div>
        <Alert
          showAlert = { showAlert }
          message = {t('home.alert')}
        />
        <div>
          <Timer
            isReseted = { handleReset }
            seconds = { 10800 }
            buttonEnabled = { true }
          />
        </div>
        <div className="source">{t('home.source')} <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a></div>
        {locationError && 
          showLocationError()
        }
      </div>
    </Fragment>
  )
}

export default withRouter(Home)