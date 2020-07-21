import React, { useState, useEffect } from 'react'
import { getWeekDay, getMonthNames } from '../../methods/handleDateNames'

const ClockComponent = () => {
  const [date, setDate] = useState(new Date());
  const counter = () => setDate(new Date())  

  // console.log(getWeekDay)

  useEffect(() => {
    const timerID = setInterval( () => counter(), 1000 ); 

    return function cleanup() {
        clearInterval(timerID);
      };
  });

   return (
      <div>
        {/* <h5>{date.getUTCDate()} / {date.getUTCMonth()} / {date.getUTCFullYear()} - {date.toLocaleTimeString('pt-Br', { hour12: false})}</h5> */}
        {/* {getWeekDay(date.getDay())} {getMonthNames(date.getMonth())} */}
      </div>
    );
}

export default ClockComponent
