import "../styles/PendingTasks.css";
function PendingTasks({ tasks }) {
  return (
    <>
       <div className="pending-page">
    <h2 className="pending-title">
      <span className="title-icon">📌</span>
       Pending Tasks</h2>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <div
            key={task.id}
            style={{ marginBottom: "20px" ,
              padding:"30px"
            }}
          >
            <h4>{task.taskName}</h4>

            <p>
              {task.studyHours.toFixed(2)} / {task.targetHours} hrs
            </p>

            <div
              style={{
                width: "350px",
                height: "20px",
                background: "#ddd",
                borderRadius: "10px",
                padding:"5px"
              }}
            >
              <div
                style={{
                  width: `${
                    (task.studyHours /
                      task.targetHours) *
                    100
                  }%`,
                  height: "100%",
                  background: "#22c55e",
                  borderRadius: "10px",
                  padding:"5px"
                }}
              />
            </div>
          </div>
        ))}
        </div>
    </>
  );
}

export default PendingTasks;