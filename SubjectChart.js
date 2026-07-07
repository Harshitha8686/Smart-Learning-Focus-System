import "./styles/WeeklyTrend.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SubjectChart({ sessions = [], tasks = [] }) {
  console.log("Sessions:", sessions);
console.log("Tasks:", tasks);

  const totals = {};

  const currentTaskNames = tasks.map(task => task.taskName);

sessions
  .filter(session => currentTaskNames.includes(session.taskName))
  .forEach(session => {
    if (!totals[session.taskName]) {
      totals[session.taskName] = 0;
    }

    totals[session.taskName] += session.studiedTime;
  });

  const labels = Object.keys(totals);
  const values = Object.values(totals);
  console.log(labels);
console.log(values);
console.log(totals);

  const totalStudy = values.reduce((sum, value) => sum + value, 0);

  const topSubject =
    labels.length > 0
      ? labels[values.indexOf(Math.max(...values))]
      : "None";

  const average =
    values.length > 0
      ? Math.round(totalStudy / values.length)
      : 0;

  const data = {
    labels,
    datasets: [
      {
        label: "Study Time (Minutes)",
        data: values,
        backgroundColor: "#2563eb",
        borderRadius: 12,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top"
      }
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Minutes"
        }
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "30px"
      }}
    >
      <h2
        style={{
          fontSize: "42px",
          fontWeight: "800"
        }}
      >
        <span className="title-icon">📚</span>
         Subject Wise Study Time
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px"
        }}
      >
        Compare the amount of time spent on each subject.
      </p>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <div className="summary-card">
          <h4>
            <span className="title-icon">📖</span>
             Total Study</h4>
          <h2>{totalStudy} mins</h2>
        </div>

        <div className="summary-card">
          <h4> 
            <span className="title-icon">🏆</span>
            Top Subject</h4>
          <h2>{topSubject}</h2>
        </div>

        <div className="summary-card">
          <h4>
            <span className="title-icon">⏱</span>
             Average</h4>
          <h2>{average} mins</h2>
        </div>
      </div>

      {/* Chart */}

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 15px 40px rgba(37,99,235,.12)",
          height: "520px"
        }}
      >
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default SubjectChart;