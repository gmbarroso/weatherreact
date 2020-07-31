import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

import Header from '../../containers/Header'

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import Home from '../../containers/Home'

const Root = () => {
  const { i18n } = useTranslation('common')

  const handleLanguage = lang => {
    i18n.changeLanguage(lang)
    return lang
  }
  
  return (
    <Fragment>
      <Header />
        <Switch>
          <Route exact path="/" component={() => <Home lang = { handleLanguage } />} />
          <Route path="/home" component={() => <Home />} />
        </Switch>
    </Fragment>
  )
}

Root.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }).isRequired,
}

export default withRouter(Root)
