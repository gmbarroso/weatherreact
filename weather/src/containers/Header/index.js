import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const enhance = compose(withRouter)

class Header extends Component {
  constructor (props) {
    super(props)

    // this.onHomeClick = this.onHomeClick.bind(this)
    // this.onObraClick = this.onObraClick.bind(this)
    // this.onAutorClick = this.onAutorClick.bind(this)
    // this.onGiantsClick = this.onGiantsClick.bind(this)
    // this.onElencoClick = this.onElencoClick.bind(this)
    // this.onInspirationsClick = this.onInspirationsClick.bind(this)
  }

  // onHomeClick () {
  //   this.props.history.push('/mountaingiants')
  // }

  // onObraClick () {
  //   this.props.history.push('/obra')
  // }

  // onAutorClick () {
  //   this.props.history.push('/autor')
  // }

  // onGiantsClick () {
  //   this.props.history.push('/gigantes')
  // }

  // onElencoClick () {
  //   this.props.history.push('/elenco')
  // }

  // onInspirationsClick () {
  //   this.props.history.push('/inspiracoes')
  // }

  render () {
    return (
      <div className="header">
        <h1>Weather</h1>
        <div className="links">
          <Button variant="primary">Primary</Button>
        </div>
      </div>
    )
  }
}

export default enhance(Header);