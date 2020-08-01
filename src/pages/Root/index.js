import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

import {
  Header,
  Home
} from '../../containers'

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

const Root = () => {
  const { i18n } = useTranslation('common')

  const handleLanguage = lang => {
    i18n.changeLanguage(lang)
    return lang
  }
  
  return (
    <Fragment>
      <Header />
      <Home lang = { handleLanguage } />
        {/* <Switch>
          <Route exact path="weatherreact/" component={() => <Home lang = { handleLanguage } />} />
          <Route path="weatherreact/home" component={() => <Home />} />
        </Switch> */}
    </Fragment>
  )
}

Root.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
  }).isRequired,
}

export default withRouter(Root)
