import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  let ref = useRef();
  function startTimer() {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
    }
  }
  function stopTimer() {
    clearInterval(ref.current);
    ref.current = null;
  }
  function resetTimer() {
    clearInterval(ref.current);
    ref.current = null;
    setTime(0);
    setHour(0);
    setMin(0);
    setSec(0);
  }
  useEffect(() => {
    if (time == 10) {
      setSec((pre) => pre + 1);
      setTime(0);
    }
    if (sec == 60) {
      setMin((prev) => prev + 1);
      setSec(0);
    }
    if (min == 60) {
      setHour((prev) => prev + 1);
      setMin(0);
    }
  }, [time, sec, min]);
  return (
    <div>
      <div className="timer-container">
        <h3>
          {hour}:{min}:{sec}:{time}
        </h3>
      </div>
      <div className="controllers-container">
        <button onClick={startTimer}>START</button>
        <button onClick={stopTimer}>STOP</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
    </div>
  );
};

export default Timer;
