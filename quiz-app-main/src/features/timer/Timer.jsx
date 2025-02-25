import React, { useEffect, useState } from "react";

const Timer = ({ setSubmit, submit, totalTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerId);
          onComplete();
          setSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [onComplete, setSubmit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="circular-timer">
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#76c7c0" strokeWidth="10" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18">
          {minutes} : {seconds}
        </text>
      </svg>
      <p>
        Timer Remaining: <span style={{ fontSize: "21px" }}>
          {minutes} min {seconds} sec
        </span>
      </p>
    </div>
  );
};

export default Timer;
