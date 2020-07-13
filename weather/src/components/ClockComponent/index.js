import React, { useState, useEffect } from 'react'

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
      <div>
        <h5>{date.toLocaleTimeString()}.</h5>
      </div>
    );
}

export default ClockComponent
