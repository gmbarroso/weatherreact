import { token } from './parameters'

const getUserLocation = async (lat, lng) => {
    if (lat && lng) {
        const result = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${token}&q=${lat}%2C%20${lng}`, {
            mode: 'cors',
            method: 'GET',
        })
        return result.json()
    }
}

export default getUserLocation
