import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const ClockComponent = () => {
  const { t, i18n } = useTranslation('common')

  const getWeekDays = day => {
    switch (day) {
        case 1:
            return `${t('header.weekDays.mon')}`
        case 2:
            return `${t('header.weekDays.tue')}`
        case 3:
            return `${t('header.weekDays.wed')}`
        case 4:
            return `${t('header.weekDays.thu')}`
        case 5:
            return `${t('header.weekDays.fri')}`
        case 6:
            return `${t('header.weekDays.sat')}`
        default:
            return `${t('header.weekDays.sun')}`
    }
}

const getMonthNames = day => {
    switch (day) {
        case 1:
            return `${t('header.months.feb')}`
        case 2:
            return `${t('header.months.mar')}`
        case 3:
            return `${t('header.months.apr')}`
        case 4:
            return `${t('header.months.may')}`
        case 5:
            return `${t('header.months.jun')}`
        case 6:
            return `${t('header.months.jul')}`
        case 7:
            return `${t('header.months.aug')}`
        case 8:
            return `${t('header.months.sep')}`
        case 9:
            return `${t('header.months.oct')}`
        case 10:
            return `${t('header.months.nov')}`
        case 11:
            return `${t('header.months.dec')}`
        default:
            return `${t('header.months.jan')}`
    }
}

  const [date, setDate] = useState(new Date());
  const counter = () => setDate(new Date())  

  useEffect(() => {
    const timerID = setInterval( () => counter(), 1000 ); 

    return function cleanup() {
        clearInterval(timerID);
      };
  });

  const handleLanguageKey = () => {
    if(i18n.language === 'br') {
      return 'pt-Br'
    }

    if(i18n.language === 'en') {
      return 'en-US'
    }

    if(i18n.language === 'es') {
      return 'es-ES'
    }
  }

  return (
     <div style={{ marginBottom: 0 }}>
       {getWeekDays(date.getDay())} {getMonthNames(date.getMonth())} {date.getFullYear()} - {date.toLocaleTimeString(handleLanguageKey(), { hour12: false})}
     </div>
  );
}

export default ClockComponent
