import React, { useEffect, useState } from "react";

const Timer = ({ isReseted, seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    let interval = null

    interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    const handleTimer = (event) => {
      console.log(event)
      console.log(timeLeft)
    }

    handleTimer(isReseted)

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
    <div>
      <h5>{secondsToHms(timeLeft)}</h5>
    </div>
  );
};

export default Timer