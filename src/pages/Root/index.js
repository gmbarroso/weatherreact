import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';

import {
  Header,
  Home
} from '../../containers'

import {
  Route,
  Switch,
  HashRouter,
  withRouter,
} from 'react-router-dom'

const Root = () => {
  const { i18n } = useTranslation('common')

  const handleLanguage = lang => {
    i18n.changeLanguage(lang)
    return lang
  }
  
  // Using HashRouter is not the final solution
  return (
    <Fragment>
      <Header />
      {/* <Home lang = { handleLanguage } /> */}
      {/* <Switch>
        <Route exact path="/" component={() => <Home lang = { handleLanguage } />} />
        <Route path="/home" component={() => <Home />} />
      </Switch> */}
      <HashRouter>
        <Route exact path="/" component={() => <Home lang = { handleLanguage } />} />
      </HashRouter>
    </Fragment>
  )
}

// Root.propTypes = {
//   history: PropTypes.shape({
//     listen: PropTypes.func,
//   }).isRequired,
// }

export default withRouter(Root)
