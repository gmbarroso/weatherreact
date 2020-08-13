import { useState, useEffect } from 'react'

const useGeolocation = (options ={}) => {
  const [ error, setError ] = useState()
  const [ latitude, setLatitude ] = useState()
  const [ longitude, setLongitude ] = useState()
  
  const handleSuccess = position => {
    const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
  }
    
  const handleError = err => {
    setError(err.message)
  }
    
  useEffect(() => {
    if(!navigator.geolocation) {
      setError('Location not found')
      return
    }
    
    // navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError)
    return () => navigator.geolocation.clearWatch(watcher)
  }, [options])

  return { latitude, longitude, error }
}

export default useGeolocation