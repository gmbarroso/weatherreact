import React, { useEffect, useState } from "react";

import { Button } from 'react-bootstrap';

import './style.css'


const Timer = ({
  isReseted,
  seconds,
  available,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  const handleTimer = () => {
    isReseted(false)
    setTimeLeft(10800);
  }

  useEffect(() => {
    let interval = null

    if (isReseted) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft !== 10800) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isReseted, seconds]);

  const secondsToHms = (value) => {
    const h = Math.floor(value / 3600);
    const m = Math.floor(value % 3600 / 60);
    const s = Math.floor(value % 3600 % 60);

    let hour = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let minute = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let second = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hour + minute + second;
  }

  return (
    <div className="timer">
      <h5>{secondsToHms(timeLeft)}</h5>
      {available &&
      <div className="buttonTimer">
        <Button
            onClick = { () => handleTimer() }
            variant="primary"
          >
              Atualizar agora
        </Button>
      </div>
      }
    </div>
  );
};

export default Timer