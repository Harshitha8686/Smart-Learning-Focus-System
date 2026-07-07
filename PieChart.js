import "./styles/TaskCompletion.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChart({
  completedTasks,
  pendingTasks
}) {
  const data = {
    labels: [
      "Completed",
      "Pending"
    ],
    datasets: [
      {
        data: [
          completedTasks,
          pendingTasks
        ],
        backgroundColor: [
          "#4CAF50",
          "#FF9800"
        ]
      }
    ]
  };

  return (

<div className="completion-page">

    <h1 className="completion-title">
        
        <span className="title-icon">📈</span>
         Task Completion Status
    </h1>

    <p className="completion-subtitle">
        Visual overview of completed and pending study tasks.
    </p>

    <div className="completion-card">

        <div className="chart-container">

            <Pie
                data={data}
                options={{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{
position:"top",
labels:{
font:{
size:16
}
}
}
}
}}
            />

        </div>

    </div>

</div>

);
}

export default PieChart;