import TaskChart from "./TaskChart";
import PieChart from "./PieChart";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import PendingTasks from "./pages/PendingTasks";
import StudyHistoryPage from "./pages/StudyHistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import FocusScorePage from "./pages/FocusScorePage";
import PlannerPage from "./pages/PlannerPage";
import WeeklyTrendPage from "./pages/WeeklyTrendPage";
import SubjectStudyPage from "./pages/SubjectStudyPage";
import MotivationPage from "./pages/MotivationPage";
import { useState, useEffect } from "react";
function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    console.log("Sessions:", sessions);
}, [sessions]);
  const loadSessions = async () => {

    const response = await fetch(
        "http://localhost:8080/api/study/all"
    );

    const data = await response.json();

    setSessions(data);

    if (data.length > 0) {

        const avgFocusScore = Math.round(
            data.reduce(
                (sum, session) => sum + (session.focusScore || 0),
                0
            ) / data.length
        );

        setFocusScore(avgFocusScore);

    } else {

        setFocusScore(0);

    }
};
const [selectedTask, setSelectedTask] = useState(null);
useEffect(() => {
    console.log("Dashboard Selected:", selectedTask);
}, [selectedTask]);
useEffect(() => {
    console.log("Selected Task:", selectedTask);
}, [selectedTask]);
  const [tasks, setTasks] = useState([]);
  const [focusScore, setFocusScore] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] =
useState("dashboard");
const loadTasks = async () => {

    const response = await fetch(
        "http://localhost:8080/api/tasks"
    );

    const data = await response.json();

    console.log("Dashboard Tasks:", data);

    setTasks(data);

};
const loadStreak = async () => {

    const response = await fetch(
        "http://localhost:8080/api/streak"
    );

    const data = await response.json();
    console.log("Current Streak:", data);

    setStreak(data.streak);
};

useEffect(() => {

    loadTasks();

    loadSessions();

    loadStreak();

}, []);
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = tasks.filter(
  (task) => !task.completed
).length;
  return (
    <div
  style={{
    display: "flex",
    height: "100vh",
    overflow: "hidden"
  }}
>
    <Sidebar

activePage={activePage}

setActivePage={setActivePage}

/>
  <div
style={{
    flex: 1,
    marginLeft: "250px",
    height: "100vh",
    overflowY: "auto"
}}
>      {/* Existing Dashboard Content */}
    <div
  style={{
    backgroundColor: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh"
  }}
>
  {activePage === "dashboard" && (
  <DashboardHome
    tasks={tasks}
    setSelectedTask={setSelectedTask}
    loadSessions={loadSessions}
    loadTasks={loadTasks}
    setFocusScore={setFocusScore}
    loadStreak={loadStreak}
/>
)}

{activePage === "pending" && (
  <PendingTasks
    tasks={tasks}
    onTaskSelect={setSelectedTask}
/>
)}

{activePage === "history" && (
  <StudyHistoryPage />
)}

{activePage === "analytics" && (
  <AnalyticsPage
    selectedTask={selectedTask}
    tasks={tasks}
    sessions={sessions}
  />
)}

{activePage === "hours" && (
  <TaskChart />
)}

{activePage === "completion" && (
  <PieChart
    completedTasks={completedTasks}
    pendingTasks={pendingTasks}
  />
)}

{activePage === "focus" && (
  <FocusScorePage
    focusScore={focusScore}
  />
)}



{activePage === "planner" && (
  <PlannerPage />
)}

{activePage === "weekly" && (
  <WeeklyTrendPage
    sessions={sessions}
  />
)}

{activePage === "subject" && (
  <SubjectStudyPage
    sessions={sessions}
    tasks={tasks}
  />
)}

{activePage === "motivation" && (
  <MotivationPage
    sessions={sessions}
    tasks={tasks}
    streak={streak}
/>
)}
</div>
    </div>
</div>
  );
}

export default Dashboard;