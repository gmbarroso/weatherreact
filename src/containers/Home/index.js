import React, { useState, useEffect, useCallback, Fragment } from 'react';

import {
  Card,
  Timer,
  Alert,
  Flags,
} from '../../components'

import {
  getHourly,
  getTwelve,
  getNextDayWeather,
  getUserLocation,
  getDayWeather,
  getCitiesList
} from '../../requests'

import {
  useGeolocation,
  useDarkTheme,
  useLocalStorage
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
  timeout: 1000 * 60 * 1
}

const Home = props => {
  const { latitude, longitude, locationError } = useGeolocation(geoLocationOptions)
  const [ hourly, setHourly ] = useState(weatherObject)
  const [ twelve, setTwelve ] = useState(weatherObject)
  const [ nextDay, setNextDay ] = useState(weatherObject)
  const [ isChecked, setChecked ] = useLocalStorage('darkMode', false)
  const [ showAlert, setShowAlert ] = useState(false)  
  const [ error, setError ] = useState(null)
  const [ cities, setCities ] = useState([])
  const showLocationError = () => alert(locationError)
  const { t, i18n } = useTranslation('common')
  
  useDarkTheme(isChecked)

  const getCities = () => {
    getCitiesList()
    .then(value => {
      setCities(value)
    })
    return cities
  }

  const getCityKey = (e) => {
    const key = e.target.value
    getForecast(key, null)
  }

  const getCityName = key => {
    const selectedCity = cities.find(city => city.Key === key)

    return {
      city: selectedCity.LocalizedName,
      country: selectedCity.Country.EnglishName
    }
  }

  const getForecast = (key, location) => {
    const cityName = location ? location.ParentCity.EnglishName : getCityName(key).city
    const neighborhood = location ? location.LocalizedName : getCityName(key).country
    getHourly(key, i18n.language)
      .then(value => {
        const forecast = value[0]
        getDayWeather(key, i18n.language)
          .then(value => {
            const minimum = value.DailyForecasts[0].Temperature.Minimum.Value

            setHourly({
              cityName: cityName,
              neighborhood: neighborhood,
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
          cityName: cityName,
          neighborhood: neighborhood,
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
          cityName: cityName,
          neighborhood: neighborhood,
          comment: forecast.Day.IconPhrase,
          max: forecast.Temperature.Maximum.Value,
          min: forecast.Temperature.Minimum.Value,
          prec: forecast.Day.Rain.Value,
          prob: forecast.Day.PrecipitationProbability,
          dayIcon: forecast.Day.Icon
        })
      })
  }

  const getData = useCallback(() => {
    getUserLocation(latitude, longitude)
        .then(location => {
          if(location) {
            const key = location.Key
            getForecast(key, location)
          }
        })
        .catch(errorMessage => errorMessage ? setError(true) : setError(false))
  }, [i18n, latitude, longitude])

  const renderLoader = useCallback(() => {
    const hour = hourly.cityName
    const twe = twelve.cityName
    const next = nextDay.cityName

    if (hour && twe && next) {
      return false
    } else {
      return true
    }
  }, [hourly.cityName, twelve.cityName, nextDay.cityName])

  const handleReset = (value) => {
    if(value) {
      getData()
      setShowAlert(true)
    }
    
    setTimeout(()=> {
      setShowAlert(false)
    }, 3000)
  }

  const handleClick = () => setChecked(!isChecked)

  useEffect(() => {
    if (hourly.comment === null) {
      getCities()
      getData()
      renderLoader()
    }
  }, [hourly, latitude, longitude, i18n, getData, renderLoader])

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
        {/* <LocationButtons list = { cities } /> */}
        <select id="city" onChange={e => getCityKey(e)} defaultValue="">
          <option defaultValue >Selecione uma cidade</option>
          {cities.map(city => {
            return <option key={city.LocalizedName} value={city.Key}>{city.LocalizedName} - {city.Country.ID}</option>
          })}
        </select>
        {/* <button>Click Me</button> */}
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
            loader = { renderLoader() }
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
            loader = { renderLoader() }
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
            loader = { renderLoader() }
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
            loader = { renderLoader() }
            error = { error }
          />
        </div>
        {!error &&
          <div className="source">{t('home.source')} <a href="https://www.accuweather.com/" target="_blank" rel="noopener noreferrer">AccuWeather</a></div>
        }
        {locationError && 
          showLocationError()
        }
      </div>
    </Fragment>
  )
}

export default withRouter(Home)
