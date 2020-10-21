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
  const [ cityKey, setCityKey ] = useState()
  const [ hourly, setHourly ] = useState(weatherObject)
  const [ twelve, setTwelve ] = useState(weatherObject)
  const [ nextDay, setNextDay ] = useState(weatherObject)
  const [ isChecked, setChecked ] = useLocalStorage('darkMode', false)
  const [ showAlert, setShowAlert ] = useState(false)  
  const [ error, setError ] = useState(null)
  const [ cities, setCities ] = useState([])
  const [ selectedCity, setSelectedCity ] = useState([])
  const { t, i18n } = useTranslation('common')
  
  useDarkTheme(isChecked)

  const renderError = useCallback(() => {
    if(!latitude || !longitude) {
      setError(true)
    }
    if(latitude || longitude) {
      setError(false)
    }
    if(cityKey) {
      setError(false)
    }
  }, [latitude, longitude, cityKey])

  const getCities = useCallback(() => {
    getCitiesList()
      .then(value => {
        setCities(value)
      })
      .catch(error => error ? setError(true) : setError(false))
    return cities
  }, [cities])

  const getCityKey = (e) => {
    const key = e.target.value
    if(key === "0") return
    setSelectedCity(key)
    getForecast(key, null)
  }

  const getCityName = useCallback(key => {
    const selectedCity = cities.find(city => city.Key === key)

    if (selectedCity) {
      return {
        city: selectedCity.LocalizedName,
        country: selectedCity.Country.EnglishName
      }
    } else {
      return {
        city: null,
        country: null
      }
    }
  }, [cities])

  const getForecast = useCallback((key, location) => {
    setCityKey(key)
    let cityName = location ? location.ParentCity.EnglishName : getCityName(key).city
    let neighborhood = location ? location.LocalizedName : getCityName(key).country
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
        .catch(error => error ? setError(true) : setError(false))
      })
      .catch(error => error ? setError(true) : setError(false))

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
      .catch(error => error ? setError(true) : setError(false))

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
      .catch(error => error ? setError(true) : setError(false))
  }, [setCityKey, i18n, getCityName ])

  const getData = useCallback(() => {
    getUserLocation(latitude, longitude)
        .then(location => {
          if(location) {
            const key = location.Key
            getForecast(key, location)
          }
        })
        .catch(error => error ? setError(true) : setError(false))
  }, [latitude, longitude, getForecast])

  const renderLoader = useCallback(() => {
    console.log(selectedCity)
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
      renderError()
    }
  }, [hourly, latitude, longitude, i18n, cities, getData, renderLoader, getCities, renderError])

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
        <select id="city" className="citiesDropdown" onChange={e => getCityKey(e)}>
          <option defaultValue value={"0"} >Selecione uma cidade</option>
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
            sharedLocation = { latitude }
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
            sharedLocation = { latitude }
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
            sharedLocation = { latitude }
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
          locationError
        }
      </div>
    </Fragment>
  )
}

export default withRouter(Home)
