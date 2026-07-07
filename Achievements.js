import { useState, useEffect } from "react";

function Achievements() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const totalHours = tasks.reduce(
    (sum, task) => sum + task.studyHours,
    0
  );

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc"
      }}
    >
      <h2>🏅 Achievements</h2>

      <ul>
        {totalHours > 0 && (
          <li>🎉 First Study Session</li>
        )}

        {totalHours >= 5 && (
          <li>📚 5 Hours Studied</li>
        )}

        {totalHours >= 10 && (
          <li>🔥 10 Hours Studied</li>
        )}

        {totalHours >= 20 && (
          <li>🚀 Study Master</li>
        )}
      </ul>
    </div>
  );
}

export default Achievements;