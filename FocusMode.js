import { useEffect, useState } from "react";
import "../styles/TaskManager.css";
function FocusMode({ currentTask, studyRunning }) {

  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (studyRunning) {
      setFocusMode(true);
    } else {
      setFocusMode(false);
    }
  }, [studyRunning]);

  if (!focusMode) return null;

  return (
    <div
      style={{
        background: "#d4edda",
        border: "2px solid green",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px"
      }}
    >
      <h2>
        <span className="title-icon">🎯</span>
         Focus Mode Enabled</h2>

      <p>
        Current Subject:
        <b> {currentTask?.taskName}</b>
      </p>

      <p>Distractions are being monitored...</p>
    </div>
  );
}

export default FocusMode;