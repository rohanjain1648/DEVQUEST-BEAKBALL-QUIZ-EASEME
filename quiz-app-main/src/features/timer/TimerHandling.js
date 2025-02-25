import { useEffect, useState } from "react";

export const TimerHandling = () => {
  const initialTimers = 1 * 60;
  const [secondsRemaining, setSecondRemaining] = useState(initialTimers);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondRemaining((prev) => prev - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
};
