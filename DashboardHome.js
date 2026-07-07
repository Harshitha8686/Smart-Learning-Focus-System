import TaskManager from "../TaskManager";
import WelcomeBanner from "../components/WelcomeBanner";
import DashboardCards from "../components/DashboardCards";
import "../components/Dashboard.css";

function DashboardHome({
    tasks = [],
    setSelectedTask,
    loadSessions,
    loadTasks,
    loadStreak,
    setFocusScore
})  {
  return (
    <div className="dashboard-home">

      <WelcomeBanner />

      <DashboardCards tasks={tasks} />

      <div className="section-title">
        <h2>
          <span className="title-icon">📋</span>
           Task Manager</h2>
        <p>Manage your study tasks and track your progress.</p>
      </div>

      <TaskManager
    onTaskSelect={setSelectedTask}
    loadSessions={loadSessions}
    loadTasks={loadTasks}
    loadStreak={loadStreak}
/>
   

    </div>
  );
}

export default DashboardHome;