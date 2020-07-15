import React, { useEffect, useState } from "react";

import { Button } from 'react-bootstrap';

import './style.css'


const Timer = ({
  isReseted,
  seconds,
  disabled,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [ buttonDisabled, setButtonDisabled ] = useState(false)

  const handleTimer = () => {
    isReseted(true)
    setTimeLeft(seconds);
    setButtonDisabled(true)

    // console.log(buttonDisabled)
    // if (!buttonDisabled) {
    //   setInterval(() => {
    //     setButtonDisabled(false);
    //   }, 3000);
    // }
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

    if (buttonDisabled) {
      setInterval(() => {
        setButtonDisabled(false);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isReseted, seconds, buttonDisabled]);

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
      {!disabled &&
      <div className="buttonTimer">
        <Button
            onClick = { () => handleTimer() }
            variant="primary"
            disabled = { buttonDisabled }
          >
              Atualizar agora
        </Button>
      </div>
      }
    </div>
  );
};

export default Timer