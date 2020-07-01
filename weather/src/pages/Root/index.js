import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from '../../containers/Header'

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { compose } from 'ramda'

import Home from '../../containers/Home'

const enhance = compose(withRouter)

class Root extends Component {
  render () {
    return (
      <Fragment>
        <Header />
          <Switch>
            <Route exact path="/home" component={Home} />
            {/* <Route path="/obra" component={Obra} /> */}
          </Switch>
        {/* <Footer /> */}
      </Fragment>
    )
  }
}

Root.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }).isRequired,
}

export default enhance(Root)
