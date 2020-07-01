import React from 'react';

import Card from '../../components/CardComponent'

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const enhance = compose(withRouter)

const Home = () => {
  return (
    <div className="home">
      <div className="card-container">
        <Card
          cityName = "São Paulo"
          weatherState = "Tempo nublado com chuvas"
          minTemp = "14"
          maxTemp = "22"
          rainPrec = "25"
          rainProb = "67"
        />
        <Card
          cityName = "Brasília"
        />
        <Card
          cityName = "Rio de Janeiro"
        />
      </div>
    </div>
  )
}

export default enhance(Home)
