import { useState, useEffect } from "react";
import "./styles/Pomodoro.css";
function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      alert("Pomodoro Completed!");
      setSessions((prev) => prev + 1);
      setIsRunning(false);
      setTimeLeft(25 * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-page">

    <h1 className="pomodoro-title">
        🍅 Pomodoro Timer
    </h1>

    <p className="pomodoro-subtitle">
        Stay focused using the Pomodoro Technique.
    </p>

    <div className="pomodoro-card">

        <div className="timer-circle">

            <div className="timer-time">
    {Math.floor(timeLeft / 60)}:
    {(timeLeft % 60).toString().padStart(2, "0")}
</div>

        </div>

        <div className="timer-buttons">

            <button className="timer-btn start-btn">
                ▶ Start
            </button>

            <button className="timer-btn pause-btn">
                ⏸ Pause
            </button>

            <button className="timer-btn reset-btn">
                🔄 Reset
            </button>

        </div>

    </div>

</div>);
}

export default PomodoroTimer;