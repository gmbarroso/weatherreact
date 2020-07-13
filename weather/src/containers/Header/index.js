import React from 'react';

import { Button } from 'react-bootstrap';

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const enhance = compose(withRouter)

const Header = () => {
  return (
    <div className="header">
      <h1>Weather</h1>
      <div className="links">
        <Button variant="primary">Primary</Button>
      </div>
    </div>
  )
}

export default enhance(Header);