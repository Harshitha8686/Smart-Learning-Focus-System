import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

function TaskChart() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const data = {
    labels: tasks.map((task) => task.taskName),

    datasets: [
      {
        label: "Study Hours",
        data: tasks.map((task) =>
  Number(task.studyHours.toFixed(2))
        ),
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Study Hours Per Task",
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>
        <span className="title-icon">📊</span>
         Study Hours Chart</h2>

      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default TaskChart;