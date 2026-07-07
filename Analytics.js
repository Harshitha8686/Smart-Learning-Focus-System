
function Analytics({
    selectedTask,
    tasks,
    sessions
}) {
  const task = selectedTask;

const taskSessions = sessions.filter(
  s => s.taskName === task?.taskName
);

const completedHours =
  taskSessions.reduce(
    (sum, s) => sum + s.studiedTime,
    0
  ) / 60;

const today =
  new Date().toISOString().split("T")[0];

const todayMinutes =
  taskSessions
    .filter(s => s.date === today)
    .reduce(
      (sum, s) => sum + s.studiedTime,
      0
    );

const totalSessions =
  taskSessions.length;

const averageSession =
  totalSessions === 0
    ? 0
    : todayMinutes / totalSessions;

const remainingHours =
  task
    ? task.targetHours - completedHours
    : 0;

const completion =
  task
    ? (completedHours / task.targetHours) * 100
    : 0;

const focusScore =
  Math.round(completion);
 return (
<div className="analytics-page">

    <h1 className="analytics-title"> 
        <span className="title-icon">📊</span>
        Analytics Dashboard
    </h1>

    <p className="analytics-subtitle">
        Track your learning performance and focus statistics.
    </p>

    {!task ? (

        <div className="analytics-empty">

            <div className="empty-icon">
                <span className="title-icon">📈</span>
                </div>

            <h2>No Active Study Session</h2>

            <p>
                Select a task and click <b>Start Study</b> to view live analytics.
            </p>

        </div>

    ) : (

        <>

            <div className="analytics-cards">

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">📚</span>
                        Subject</h4>
                    <h2>{task.taskName}</h2>
                </div>

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">🎯</span>
                        Target Hours</h4>
                    <h2>{task.targetHours} hrs</h2>
                </div>

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">⏱</span>
                        Completed</h4>
                    <h2>{completedHours.toFixed(2)} hrs</h2>
                </div>

                <div className="analytics-card">
                    <h4>
                        <span className="title-icon">⌛</span>
                         Remaining</h4>
                    <h2>{remainingHours.toFixed(2)} hrs</h2>
                </div>

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">📅</span>
                        Today's Study</h4>
                    <h2>{todayMinutes} mins</h2>
                </div>

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">📖</span>
                        Sessions</h4>
                    <h2>{totalSessions}</h2>
                </div>

                <div className="analytics-card">
                    <h4> 
                        <span className="title-icon">📊</span>
                        Avg Session</h4>
                    <h2>{averageSession.toFixed(1)} mins</h2>
                </div>

                <div className="analytics-card score">
                    <h4> 
                        <span className="title-icon">🔥</span>
                        Focus Score</h4>
                    <h2>{focusScore}%</h2>
                </div>

            </div>

            <div className="progress-section">

                <h3>Overall Progress</h3>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${Math.min(completion,100)}%`
                        }}
                    ></div>

                </div>

                <p>{completion.toFixed(1)}% Completed</p>

            </div>

        </>

    )}

</div>
);
}

export default Analytics;