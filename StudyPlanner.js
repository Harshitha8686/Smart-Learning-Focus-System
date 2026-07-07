import { useState, useEffect } from "react";
import "./styles/Planner.css";

function StudyPlanner() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));

    }, []);

    const pendingTasks = tasks.filter(task => !task.completed);

    return (

        <div className="planner-page">

            <h1 className="planner-title">
                <span className="title-icon">🗓</span> 
                AI Study Planner
            </h1>

            <p className="planner-subtitle">
                Personalized study recommendations based on your progress.
            </p>

            <div className="planner-grid">

                {pendingTasks.map((task) => {

                    const remaining =
                        task.targetHours - task.studyHours;

                    let priority = "";
                    let recommendation = "";

                    if (remaining >= 5) {
                        priority = "HIGH";
                        recommendation =
                            "Focus on this task today.";
                    }
                    else if (remaining >= 2) {
                        priority = "MEDIUM";
                        recommendation =
                            "Study 1 hour today.";
                    }
                    else {
                        priority = "LOW";
                        recommendation =
                            "Almost completed. Finish it today!";
                    }

                    return (

                        <div
                            className="planner-card"
                            key={task.id}
                        >

                            <h3> 
                                <span className="title-icon">📚</span>
                                {task.taskName}</h3>

                            <div className="info-row">
                                <span className="info-label">
                                    Target
                                </span>

                                <span className="info-value">
                                    {task.targetHours} hrs
                                </span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">
                                    Completed
                                </span>

                                <span className="info-value">
                                    {task.studyHours.toFixed(1)} hrs
                                </span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">
                                    Remaining
                                </span>

                                <span className="info-value">
                                    {remaining.toFixed(1)} hrs
                                </span>
                            </div>

                            <div
                                className={`priority ${
                                    priority === "HIGH"
                                        ? "high"
                                        : priority === "MEDIUM"
                                        ? "medium"
                                        : "low"
                                }`}
                            >
                                {priority}
                            </div>

                            <div className="recommendation">
                                <strong>Recommendation</strong>
                                <br />
                                {recommendation}
                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default StudyPlanner;