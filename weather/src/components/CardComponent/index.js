import React, { Fragment } from 'react';
// import { WiDaySunny } from "weather-icons-react";
import { Card } from 'react-bootstrap';
import WeatherIcon from '../WeatherIconComponent/index'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

// const handleMoonPhase = moon => {
//   const phase = moon

//   console.log('halo', typeof phase)
// }

const CardComponent = ({
    cityName,
    minTemp,
    maxTemp,
    rainProb,
    rainPrec,
    weatherState,
    moon,
    period,
    icon
}) => (
    <Card className="card-size">
      <Card.Body>
        <Card.Title>
          <div className="cardTitle">
            <span>{cityName}</span>
            <span>{period}</span>
          </div>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{weatherState}</Card.Subtitle>
        <Fragment>
          <div className="temperatures">
            <div className="weatherStatus">
              <WeatherIcon
                icon = { icon }
              />
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
