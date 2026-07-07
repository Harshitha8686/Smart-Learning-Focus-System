import { useEffect, useState } from "react";

function AttendanceDashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/attendance")
      .then((res) => res.json())
      .then((data) => setAttendance(data));
  }, []);

  const presentCount = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const attendancePercentage =
    attendance.length > 0
      ? (
          (presentCount / attendance.length) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>📅 Attendance Dashboard</h2>

      <h3>
        Attendance Percentage:
        {attendancePercentage}%
      </h3>

      <p>✅ Present Days: {presentCount}</p>

      <p>❌ Absent Days: {absentCount}</p>

      <table border="1">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td>{a.studentName}</td>
              <td>{a.attendanceDate}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceDashboard;