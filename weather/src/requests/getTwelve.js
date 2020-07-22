import {
    token,
    br,
    details,
    metric,
  } from './parameters'
  
const forecast = async location => {
  const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location}?apikey=${token}&language=${br}&details=${details}&metric=${metric}`)
  return result.json()
}
  
export default forecast