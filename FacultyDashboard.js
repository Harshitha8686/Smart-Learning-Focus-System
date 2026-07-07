import { useState, useEffect } from "react";

function FacultyDashboard() {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));

    fetch("http://localhost:8080/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalStudyHours = students.reduce(
    (sum, student) => sum + student.studyHours,
    0
  );

  const topStudent =
    students.length > 0
      ? students.reduce((a, b) =>
          a.studyHours > b.studyHours ? a : b
        )
      : null;

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc"
      }}
    >
      <h2>👨‍🏫 Faculty Dashboard</h2>

      <p>👨‍🎓 Students: {students.length}</p>

      <p>📚 Tasks: {tasks.length}</p>

      <p>✅ Completed Tasks: {completedTasks}</p>

      <p>
        ⏱ Total Study Hours:
        {totalStudyHours.toFixed(1)}
      </p>

      {topStudent && (
        <p>
          🏆 Top Performer:
          {topStudent.name}
        </p>
      )}
    </div>
  );
}

export default FacultyDashboard;