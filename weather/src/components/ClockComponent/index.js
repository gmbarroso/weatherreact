import React, { useState, useEffect } from 'react'
import { getWeekDays, getMonthNames } from '../../methods/handleDateNames'

const ClockComponent = () => {
  const [date, setDate] = useState(new Date());
  const counter = () => setDate(new Date())  

  useEffect(() => {
    const timerID = setInterval( () => counter(), 1000 ); 

    return function cleanup() {
        clearInterval(timerID);
      };
  });

   return (
      <div style={{ marginBottom: 0 }}>
        {getWeekDays(date.getDay())} {getMonthNames(date.getMonth())} {date.getFullYear()} - {date.toLocaleTimeString('pt-Br', { hour12: false})}
      </div>
    );
}

export default ClockComponent
