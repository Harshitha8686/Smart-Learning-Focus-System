import React, { useState, useRef } from "react";

function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [subject, setSubject] = useState("Java");

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTimer = () => {
    startTimeRef.current = new Date();

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = async () => {
    clearInterval(intervalRef.current);

    const endTime = new Date();

    const durationMinutes = Math.floor(seconds / 60);

    const session = {
      subject,
      startTime: startTimeRef.current,
      endTime,
      durationMinutes,
    };

    await fetch("http://localhost:8080/api/study/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });

    alert("Study session saved!");
  };

  return (
    <div>
      <h2>Study Timer</h2>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option>Java</option>
        <option>DBMS</option>
        <option>OS</option>
      </select>

      <h3>{seconds} seconds</h3>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default StudyTimer;