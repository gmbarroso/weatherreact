import React from 'react';

import Clock from '../../components/ClockComponent'
// import { Button } from 'react-bootstrap';

import {
  withRouter,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Header = () => {
  return (
    <div className="header">
      <h1>Weather Channel</h1>
      <div className="links">
        <Clock />
      </div>
    </div>
  )
}

export default withRouter(Header);