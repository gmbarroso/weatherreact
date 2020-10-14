import React from 'react'
import { useTranslation } from 'react-i18next';

import warning from '../../img/icons/warning.png'

import './style.css'

const ErrorComponent = ({ locationError }) => {
    const { t } = useTranslation('common')

    const renderErrorMessage = () => {
        if (!locationError) {
            return <strong className="errorMessage">{t('error.sharedLocation')}</strong>
        } else {
            return <strong className="errorMessage">{t('error.forecastInformation')}</strong>
        }
    }

    return (
        <div className="errorDiv">
            <img className="errorIcon" src={warning} alt="warning"/>
            {renderErrorMessage()}
        </div>
    )
}

export default ErrorComponent