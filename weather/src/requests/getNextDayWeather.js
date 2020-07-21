import {
    token,
    br,
    details,
    metric,
    location
} from './parameters'
  
const forecast = async () => {
  const result = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location}?apikey=${token}&language=${br}&details=${details}&metric=${metric}`)
  return result.json()
  // return console.log('Batida')
}
  
export default forecast