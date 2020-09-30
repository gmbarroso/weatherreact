import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next';

import {
  Header,
  Home
} from '../../containers'

import {
  Route,
  HashRouter,
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
      <HashRouter>
        <Route exact path="/" component={() => <Home lang = { handleLanguage } />} />
      </HashRouter>
    </Fragment>
  )
}

export default withRouter(Root)
