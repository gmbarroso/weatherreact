import React from 'react'
import {
  sunny,
  mostlySunny,
  parthlySunny,
  intermittentClouds,
  hazySunshine,
  mostlyCloudy,
  cloudy,
  drearyOvercast,
  fog,
  showers,
  mostlyCloudyWithShowers,
  partlyCloudyWithShowers,
  tStorms,
  mostlyCloudyWithStorms,
  partlySunnyWithStorms,
  rain,
  flurries,
  mostlyCloudyWithFluries,
  partlySunnyWithFluries,
  snow,
  mostlyCloudyWithSnow,
  ice,
  sleet,
  freezingRain,
  rainAndSnow,
  hot,
  cold,
  windy,
  clearNight,
  mostlyClearNight,
  partlyCloudyNight,
  intermittentCloudsNight,
  hazyMoonlight,
  mostlyCloudyNight,
  partlyCloudyWithShowersNight,
  mostlyCloudyWithShowersNight,
  partlyCloudyWithStormsNight,
  mostlyCloudyWithStormsNight,
  mostlyCloudyWithFlurriesNight,
  mostlyCloudyWithSnowNight
} from '../../methods/exportWeatherIcons'

import './style.css'

const renderIcon = icon => {
  switch (icon) {
    case 1:
      return <img className="icon" src={sunny} alt="sunny"/>
    case 2:
      return <img className="icon" src={mostlySunny} alt="icon"/>
    case 3:
      return <img className="icon" src={parthlySunny} alt="icon"/>
    case 4:
      return <img className="icon" src={intermittentClouds} alt="icon"/>
    case 5:
      return <img className="icon" src={hazySunshine} alt="hazySunshine"/>
    case 6:
      return <img className="icon" src={mostlyCloudy} alt="icon"/>
    case 7:
      return <img className="icon" src={cloudy} alt="icon"/>
    case 8:
      return <img className="icon" src={drearyOvercast} alt="icon"/>
    case 11:
      return <img className="icon" src={fog} alt="icon"/>
    case 12:
      return <img className="icon" src={showers} alt="icon"/>
    case 13:
      return <img className="icon" src={mostlyCloudyWithShowers} alt="icon"/>
    case 14:
      return <img className="icon" src={partlyCloudyWithShowers} alt="icon"/>
    case 15:
      return <img className="icon" src={tStorms} alt="icon"/>
    case 16:
      return <img className="icon" src={mostlyCloudyWithStorms} alt="icon"/>
    case 17:
      return <img className="icon" src={partlySunnyWithStorms} alt="icon"/>
    case 18:
      return <img className="icon" src={rain} alt="icon"/>
    case 19:
      return <img className="icon" src={flurries} alt="icon"/>
    case 20:
      return <img className="icon" src={mostlyCloudyWithFluries} alt="icon"/>
    case 21:
      return <img className="icon" src={partlySunnyWithFluries} alt="icon"/>
    case 22:
      return <img className="icon" src={snow} alt="icon"/>
    case 23:
      return <img className="icon" src={mostlyCloudyWithSnow} alt="icon"/>
    case 24:
      return <img className="icon" src={ice} alt="icon"/>
    case 25:
      return <img className="icon" src={sleet} alt="icon"/>
    case 26:
      return <img className="icon" src={freezingRain} alt="icon"/>
    case 29:
      return <img className="icon" src={rainAndSnow} alt="icon"/>
    case 30:
      return <img className="icon" src={hot} alt="icon"/>
    case 31:
      return <img className="icon" src={cold} alt="icon"/>
    case 32:
      return <img className="icon" src={windy} alt="icon"/>
    case 33:
      return <img className="icon" src={clearNight} alt="icon"/>
    case 34:
      return <img className="icon" src={mostlyClearNight} alt="icon"/>
    case 35:
      return <img className="icon" src={partlyCloudyNight} alt="icon"/>
    case 36:
      return <img className="icon" src={intermittentCloudsNight} alt="icon"/>
    case 37:
      return <img className="icon" src={hazyMoonlight} alt="icon"/>
    case 38:
      return <img className="icon" src={mostlyCloudyNight} alt="icon"/>
    case 39:
      return <img className="icon" src={partlyCloudyWithShowersNight} alt="icon"/>
    case 40:
      return <img className="icon" src={mostlyCloudyWithShowersNight} alt="icon"/>
    case 41:
      return <img className="icon" src={partlyCloudyWithStormsNight} alt="icon"/>
    case 42:
      return <img className="icon" src={mostlyCloudyWithStormsNight} alt="icon"/>
    case 43:
      return <img className="icon" src={mostlyCloudyWithFlurriesNight} alt="icon"/>
    case 44:
      return <img className="icon" src={mostlyCloudyWithSnowNight} alt="icon"/>
    default:
      return <span>No icon to show</span>
  }
}

const WeatherIcon = ({
  icon
}) => renderIcon(icon)

export default WeatherIcon
