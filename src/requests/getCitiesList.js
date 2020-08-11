import { token } from './parameters'
  
const getCities = async () => {
  const result = await fetch(`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${token}`)
  return result.json()
}
  
export default getCities






