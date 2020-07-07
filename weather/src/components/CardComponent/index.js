import React, { Fragment } from 'react';
import { WiDaySunny } from "weather-icons-react";
import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

// const handleMoonPhase = moon => {
//   const phase = moon

//   console.log('halo', typeof phase)
// }

const handleWeatherIcons = (moon) => {
  const time = new Date()
  const hour = time.getHours()

  // handleMoonPhase(moon)

  if (hour > 5 && hour < 18) {
    return <WiDaySunny size={100}/>
  }

  return null
}

const CardComponent = ({
    cityName,
    minTemp,
    maxTemp,
    rainProb,
    rainPrec,
    weatherState,
    moon,
}) => (
    <Card className="card-size">
      <Card.Body>
        <Card.Title>{cityName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{weatherState}</Card.Subtitle>
        <Fragment>
          <div className="temperatures">
            <div className="weatherStatus">
              {handleWeatherIcons(moon)}
            </div>      
            <span className="max">Máx: {maxTemp} ºC</span>
            <span className="min">Mín: {minTemp} ºC</span>
          </div>
          <div>
            Chuva: {rainPrec} mm - {rainProb} %
          </div>
        </Fragment>
      </Card.Body>
    </Card>
)

export default CardComponent
