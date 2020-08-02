import {
    token,
    translate,
    details,
    metric,
  } from './parameters'
  
const forecast = async (location, lang) => {
  console.log(lang)
  const result = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${location}?apikey=${token}&language=${translate(lang)}&details=${details}&metric=${metric}`)
  return result.json()
}
  
export default forecast