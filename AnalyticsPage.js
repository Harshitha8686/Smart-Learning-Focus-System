import "../styles/Analytics.css";
import Analytics from "../Analytics";
export default function AnalyticsPage({
  selectedTask,
  tasks,
  sessions
}) {
  return (
    <Analytics
      selectedTask={selectedTask}
      tasks={tasks}
      sessions={sessions}
    />
  );
}