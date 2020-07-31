import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from 'react-bootstrap';
import { WeatherIcon } from '../'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const CardComponent = ({
    cityName,
    minTemp,
    maxTemp,
    rainProb,
    rainPrec,
    weatherState,
    period,
    icon
}) => {
  const { t } = useTranslation('common')

  return (
    <Card className="card-size">
      <Card.Body>
        <Card.Title>
          <div className="cardTitle">
            <span>{cityName}</span>
            <span className="period">{period}</span>
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
            <span className="max">{maxTemp} ºC</span>
            {minTemp &&
              <span className="min">{minTemp} ºC</span>
            }
          </div>
          {rainPrec !== 0 &&
            <div>
              {rainPrec} mm - {rainProb} %
            </div>
          }
          {rainPrec === 0 &&
            <div>{t('cards.noRain')}</div>
          }
        </Fragment>
      </Card.Body>
    </Card>
  )
}

export default CardComponent
