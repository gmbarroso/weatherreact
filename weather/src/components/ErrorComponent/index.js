import React from 'react'
import { useTranslation } from 'react-i18next';

import warning from '../../img/icons/warning.png'

import './style.css'

const ErrorComponent = () => {
    const { t } = useTranslation('common')

    return (
        <div className="errorDiv">
            <img className="errorIcon" src={warning} alt="warning"/>
            <strong className="errorMessage">{t('home.error')}</strong>
        </div>
    )
}

export default ErrorComponent