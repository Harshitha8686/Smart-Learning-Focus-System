import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function LeaderboardChart() {

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));

  }, []);

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >
      <h2>🏆 Student Leaderboard</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={students}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="studyHours"
            fill="#4caf50"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LeaderboardChart;