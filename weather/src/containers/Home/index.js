import React, { Component } from 'react';

import {
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

// import LeafletMap from '../Map'

import './style.css'

const enhance = compose(withRouter)

class Home extends Component {
  constructor (props) {
    super(props)

    // this.onObraClick = this.onObraClick.bind(this)
  }

  render () {
    return (
      <div className="home">
        TESTE
      </div>
    )
  }
}

export default enhance(Home)
