import React, { Fragment } from 'react'
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

const Root = () => {
  return (
    <Fragment>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </Switch>
      {/* <Footer /> */}
    </Fragment>
  )
}

Root.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }).isRequired,
}

export default enhance(Root)
