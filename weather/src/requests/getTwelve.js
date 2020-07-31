import {
    token,
    translate,
    details,
    metric,
  } from './parameters'
  
const forecast = async (location, lang) => {
  const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=${token}&language=${translate(lang)}&details=${details}&metric=${metric}`)
  return result.json()
}
  
export default forecast