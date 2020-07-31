import React from 'react';
import { useTranslation } from 'react-i18next';

import { Clock } from '../../components/'

import {
  withRouter,
} from 'react-router-dom'

import git from '../../img/logos/github-logo.png'
import linkedin from '../../img/logos/linkedin-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Header = () => {
  const { t } = useTranslation('common')
  return (
    <div className="header">
      <h1 className="marginBtm">Weather Channel</h1>
      <div className="marginBtm">
        <Clock />
        <div className="logos">
          <span>{t('header.madeBy')}</span>
          <a href="https://github.com/gmbarroso/weatherReact" target="_blank" rel="noopener noreferrer"><img className="git" src={git} alt="git"/></a>
          <a href="https://www.linkedin.com/in/guilherme-melo-barroso-msc-48a99722/" target="_blank" rel="noopener noreferrer"><img className="linkedIn" src={linkedin} alt="git"/></a>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header);