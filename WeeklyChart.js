import "./styles/WeeklyTrend.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeeklyChart({ sessions }) {

  const grouped = {};

  sessions.forEach(session => {

    const date = session.date;

    grouped[date] =
      (grouped[date] || 0) +
      (session.studiedTime || 0);

  });
  

  const labels = Object.keys(grouped);
const values = Object.values(grouped);

const totalStudy = values.reduce(
  (sum, value) => sum + value,
  0
);

const average =
  values.length > 0
    ? Math.round(totalStudy / values.length)
    : 0;

const todayStudy =
  values.length > 0
    ? values[values.length - 1]
    : 0;

  const data = {
    labels,
    datasets: [
{
    label: "Study Time (Minutes)",
    data: values,
    borderColor: "#2563eb",
    backgroundColor: "rgba(37,99,235,0.15)",
    fill: true,
    tension: 0.45,
    pointRadius: 6,
    pointHoverRadius: 9
}
]
  };
  const options = {
  responsive: true,
maintainAspectRatio: false,
 plugins:{
    legend:{
        position:"top",
        align:"center"
    }
},
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Minutes"
      }
    },
    x: {
      title: {
        display: true,
        text: "Date"
      }
    }
  }
};
return (

<div
style={{
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "20px",
  background: "linear-gradient(180deg,#ffffff,#f8fbff)",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(37,99,235,.12)"
}}
>

<h2
style={{
fontSize:"42px",
fontWeight:"800",
marginBottom:"20px"
}}
>

<span className="title-icon">📈</span>
 Weekly Study Trend
</h2>
<p
style={{
color:"#6b7280",
fontSize:"16px",
marginBottom:"20px"
}}
>
Track your daily study progress and identify your most productive days.
</p>

<div
style={{
maxWidth: "1000px",
margin: "0 auto",
height:"550px",
width:"100%"
}}
>
    <Line
        data={data}
        options={options}
    />
</div>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"20px"
}}
>
  {/* Card 1 */}

<div
onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-6px)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0)";
}}

style={{
  padding:"40px",
  background: "#fff",
  borderTop: "5px solid #2563eb",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
  textAlign: "center"
}}
>

<h3> 
  <span className="title-icon">📅</span>
  Today's Study</h3>

<h1>{todayStudy} min</h1>

</div>

{/* Card 2 */}

<div
onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-6px)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0)";
}}
style={{
  padding: "40px",
  background: "#fff",
  borderTop: "5px solid #2563eb",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
  textAlign: "center"
}}
>

<h3> 
  <span className="title-icon">📊</span>
  Average Study</h3>

<h1>{average} min/day</h1>

</div>

{/* Card 3 */}

<div
onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-6px)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0)";
}}
style={{
  padding: "40px",
  background: "#fff",
  borderTop: "5px solid #2563eb",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
  textAlign: "center"
}}
>

<h3> 
  <span className="title-icon">🔥</span>
  Best Day</h3>
<h1>{values.length ? Math.max(...values) : 0} min</h1>


</div>

{/* Card 4 */}

<div
onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-6px)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0)";
}}
style={{
  padding: "40px",
  background: "#fff",
  borderTop: "5px solid #2563eb",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
  textAlign: "center"
}}
>
<h1>{totalStudy} min</h1>


</div>

</div> 
</div>);}

export default WeeklyChart;