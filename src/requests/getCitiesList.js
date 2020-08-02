import { token } from './parameters'
  
  const forecast = async () => {
    const result = await fetch(`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=${token}`)
    return result.json()
    // return [
    //     'São Paulo',
    //     'Rio de Janeiro',
    //     'Londres'
    // ]
  }
  
  export default forecast






