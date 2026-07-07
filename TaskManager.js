import { useState, useEffect } from "react";
import "./styles/TaskManager.css";
import "./styles/Timer.css";
import FocusMode from "./components/FocusMode";
import WebsiteBlocker from "./components/WebsiteBlocker";
import FaceDetection from "./components/FaceDetection";
import EyeTracker from "./components/EyeTracker";
import { useRef } from "react";
const chrome = window.chrome;
function TaskManager({
    onTaskSelect,
    loadSessions,
    loadDashboardTasks,
    focusScore: currentFocusScore,
    loadStreak
}){
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [targetHours, setTargetHours] = useState(1);
  const [tasks, setTasks] = useState([]);
  const studyPausedRef = useRef(false);
  const [breakRunning, setBreakRunning] = useState(false);
const [breakSeconds, setBreakSeconds] = useState(0);
const [breakCompleted, setBreakCompleted] =
  useState(false);
  const [studyCompleted, setStudyCompleted] =
  useState(false);
  const [studyRunning, setStudyRunning] =
  useState(false);
  const [studyStarted, setStudyStarted] = useState(false);
const [studySeconds, setStudySeconds] =
  useState(0);
const [currentTask, setCurrentTask] =
  useState(null);
const [studyPaused, setStudyPaused] = useState(false);
const [facePresence, setFacePresence] = useState(100);
const [eyeTracking, setEyeTracking] = useState(100);
const [websiteDiscipline, setWebsiteDiscipline] = useState(100);
const [breakDiscipline, setBreakDiscipline] = useState(100);
const [focusScore, setFocusScore] = useState(100);
const [lookingAwayCount, setLookingAwayCount] = useState(0);
const [faceMissingCount, setFaceMissingCount] = useState(0);
const [focusedSeconds, setFocusedSeconds] = useState(0);
const [distractedSeconds, setDistractedSeconds] = useState(0);
const [studyMinutes, setStudyMinutes] = useState(0);
const deleteTask = async(id)=>{

    await fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
            method:"DELETE"
        }
    );

    loadTasks();

    if(loadDashboardTasks){
        loadDashboardTasks();
    }

}
useEffect(() => {

    const total =
        focusedSeconds +
        distractedSeconds;

    if (total === 0) return;

    const liveScore = Math.round(

        (focusedSeconds / total) * 100

    );

    setFocusScore(liveScore);

}, [

    focusedSeconds,

    distractedSeconds

]);
useEffect(() => {

    const score = Math.round(

        facePresence * 0.40 +

        eyeTracking * 0.30 +

        websiteDiscipline * 0.20 +

        breakDiscipline * 0.10

    );

    if (setFocusScore) {
        setFocusScore(score);
    }

}, [
    facePresence,
    eyeTracking,
    websiteDiscipline,
    breakDiscipline
]);  
const loadTasks = async () => {
    const response = await fetch("http://localhost:8080/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
}, []);
const startStudy = async (task) => {

    const studyMinutes = prompt("Enter Study Time (30,60,90 mins)");

    if (!studyMinutes) return;

    setCurrentTask(task);

    onTaskSelect?.(task);

    setStudyMinutes(Number(studyMinutes));

    setStudySeconds(Number(studyMinutes) * 60);

    setStudyRunning(true);

    setStudyPaused(false);

    console.log("Start Study Clicked");

window.postMessage(
    {
        action: "START_STUDY"
    },
    "*"
);

};
const finishStudy = async () => {
  window.postMessage(
    {
        action: "STOP_STUDY"
    },
    "*"
);

    await fetch(
        "http://localhost:8080/api/study/save",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({

                taskName:currentTask.taskName,

                targetHours:currentTask.targetHours,

                date:new Date().toISOString().split("T")[0],

                studiedTime:studyMinutes,

                focusScore,

                facePresence,

                eyeTracking,

                websiteDiscipline,

                breakDiscipline

            })
        }
    );
    const hours = studyMinutes / 60;
    await fetch(
        `http://localhost:8080/api/tasks/${currentTask.id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({

                ...currentTask,
                studyHours:currentTask.studyHours + hours

            })
        }
    );
    const response = await fetch(
  `http://localhost:8080/api/tasks/${currentTask.id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...currentTask,
      studyHours: currentTask.studyHours + hours
    })
  }
);

const data = await response.json();
console.log(data);
await fetch(
    "http://localhost:8080/api/streak/complete",
    {
        method: "POST"
    }
);
    loadTasks();

    loadSessions();
    loadStreak();

    setStudyRunning(false);

    setStudyPaused(false);

    setCurrentTask(null);

    setStudySeconds(0);

    setStudyCompleted(true);

    setTimeout(()=>{
        setStudyCompleted(false);
    },5000);
    console.log("Current Hours:", currentTask.studyHours);
console.log("New Session Hours:", hours);
console.log("Updated Hours:", currentTask.studyHours + hours);

};
useEffect(() => {

    if(!studyRunning) return;

    const timer = setInterval(() => {

        if (studyPausedRef.current) return;

        setStudySeconds(prev => {

            if(prev <= 1){

                clearInterval(timer);

                finishStudy();

                return 0;
            }

            return prev - 1;

        });

    },1000);

    return () => clearInterval(timer);

},[studyRunning]);
useEffect(() => {

    if (!breakRunning) return;

    const timer = setInterval(() => {

        setBreakSeconds(prev => {

            if (prev <= 1) {

                clearInterval(timer);

                setBreakRunning(false);
                setBreakSeconds(0);

                // Resume study timer
                setStudyPaused(false);
                studyPausedRef.current = false;

                setBreakCompleted(true);

                setTimeout(() => {
                    setBreakCompleted(false);
                }, 3000);

                alert("☕ Break Finished! Continue your study.");

                return 0;
            }

            return prev - 1;

        });

    }, 1000);

    return () => clearInterval(timer);

}, [breakRunning]);
const startBreak = async (taskId) => {

    if (!studyRunning) {
        alert("Start a study session first.");
        return;
    }

    if (breakRunning) {
        return;
    }

    const minutes = prompt("Enter Break Time (5, 10, 15 mins)");

    if (!minutes) {
        return;
    }

    // Update backend
    await fetch(
        `http://localhost:8080/api/tasks/${taskId}/break`,
        {
            method: "PUT"
        }
    );

    // Reload updated task data
    await loadTasks();

    // Pause study
    setStudyPaused(true);
    studyPausedRef.current = true;

    // Start break timer
    setBreakRunning(true);
    setBreakSeconds(Number(minutes) * 60);
};
  const addTask = async () => {
    if (!taskName.trim()) return;
    await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  taskName,
  targetHours,
  studyHours: 0,
  focusScore: 0,
  completed: false,

  allowedBreaks: Math.floor(targetHours),
  usedBreaks: 0,
  remainingBreaks: Math.floor(targetHours)
})
    });

    setTaskName("");

await loadTasks();

if(loadDashboardTasks){
    loadDashboardTasks();
  };
}
const newTask = {
    taskName,
    targetHours,
    studyHours: 0,
    completed: false,

    allowedBreaks: 5,
    remainingBreaks: 5
};
  return (



    <div className="add-task-card">

    <h2 className="section-title">
        <span className="title-icon">➕</span> 
        Add New Study Task
    </h2>

    <p className="section-subtitle">
        Create a study goal and start tracking your progress.
    </p>

    <div className="task-form">

        <div className="input-group">

            <label>
              <span className="title-icon">📚</span>
              Task Name</label>
            <input
                type="text"
                placeholder="Enter Subject Name"
                value={taskName}
                onChange={(e)=>setTaskName(e.target.value)}
            />

        </div>

        <div className="input-group">

            <label>
              <span className="title-icon">⏱</span>
               Target Hours</label>

            <input
                type="number"
                placeholder="Eg: 4"
                value={targetHours}
                onChange={(e)=>setTargetHours(e.target.value)}
            />

        </div>

    </div>

    <button
        className="add-task-btn"
        onClick={addTask}
    >
        <span className="title-icon">➕</span> 
        Add Study Task
    </button>
    <FocusMode
    currentTask={currentTask}
    studyRunning={studyRunning}
/>
<WebsiteBlocker
    studyRunning={studyRunning}
    setWebsiteDiscipline={setWebsiteDiscipline}
/>

    {
  studyRunning && (
    <div className="study-box">
      <h2>
        <span className="title-icon">📚</span> 
        Studying:
        {currentTask?.taskName}
      </h2>

      <h1>
        {Math.floor(studySeconds / 60)}
        :
        {String(
          studySeconds % 60
        ).padStart(2,"0")}
      </h1>

      <p>
        <span className="title-icon">🚀</span>
        Stay Focused
      </p>

    </div>
  )
}
{studyRunning && !breakRunning && (
    <FaceDetection studyRunning={studyRunning} />
)}
    {studyRunning && !breakRunning && (
    <EyeTracker
    studyRunning={studyRunning}
    breakRunning={breakRunning}
    setStudyPaused={setStudyPaused}
    setFacePresence={setFacePresence}
    setEyeTracking={setEyeTracking}
    lookingAwayCount={lookingAwayCount}
    setLookingAwayCount={setLookingAwayCount}
    faceMissingCount={faceMissingCount}
    setFaceMissingCount={setFaceMissingCount}
    setFocusedSeconds={setFocusedSeconds}
    setDistractedSeconds={setDistractedSeconds}
/>
)}
{studyRunning && (

<div
style={{
marginTop:20,
padding:20,
border:"1px solid #ddd",
borderRadius:10,
background:"#f8f9fa"
}}
>

<h2>
   <span className="title-icon">📊</span>
  Live AI Analytics</h2>

<p>
  <span className="title-icon">👀</span>
   Looking Away : {lookingAwayCount}</p>

<p>
  <span className="title-icon">❌</span>
   Face Missing : {faceMissingCount}</p>

<p>
  <span className="title-icon">⏱</span>
 Focused Time : {focusedSeconds} sec</p>

<p>
  <span className="title-icon">⚠</span>
  Distracted Time : {distractedSeconds} sec</p>

<h2>
<span className="title-icon">📈</span>
 Live Focus Score : {focusScore}%

</h2>

</div>

)}

    {
  breakRunning && (
    
    <div className="break-box">

      <h2> 
        <span className="title-icon">☕</span>
        Break Running</h2>

      <h1>
        {Math.floor(breakSeconds / 60)}
        :
        {String(
          breakSeconds % 60
        ).padStart(2, "0")}
      </h1>

      <p>
        Relax and refresh yourself
      </p>
    </div>
    
  )
}
{
  breakCompleted && (
    <div className="success-card">
      <h2>
        <span className="title-icon">✅</span>
        Break Completed</h2>

      <h3>
        Time To Focus Again!
      </h3>
    </div>
  )
}
{
  studyCompleted && (
    <div
      style={{
        background: "#d4edda",
        border: "2px solid green",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "center"
      }}
    >
      <h2>
        <span className="title-icon">🎉</span>
        
        Study Session Completed
      </h2>

      <h3>
        Progress Updated Successfully
      </h3>
    </div>
  )
}
{
  studyRunning && (
    <div
      style={{
        background:"#ffeeba",
        padding:"15px",
        borderRadius:"10px",
        marginBottom:"20px"
      }}
    >
      <span className="title-icon">📚</span>
      Study Session Running:
      <b> {currentTask?.taskName}</b>

      <br/>

      Please complete the current
      study session before starting
      another subject.
    </div>
  )
}


    <ul>
      {tasks.map((task) => (
      <li key={task.id}>

  <div className="task-card">

    <div className="task-header">

        <div>

            <h2 className="task-title">
                <span className="title-icon">📚</span> 
                {task.taskName}
            </h2>

            <span className="priority-badge high">
                🔥HIGH
            </span>

        </div>
    <div className="task-hours">

            {task.studyHours.toFixed(1)} / {task.targetHours} hrs

        </div>

    </div>

    <br />
   
    Allowed Breaks: {task.allowedBreaks}

    <br />

    Remaining Breaks: {task.remainingBreaks}

    <br />

    {/* Progress Bar */}

    <div
      style={{
        width: "300px",
        background: "#ddd",
        height: "20px",
        borderRadius: "10px",
        marginTop: "10px"
      }}
    >
      <div
        style={{
          width: `${
            (task.studyHours /
              task.targetHours) *
            100
          }%`,
          background: "green",
          height: "20px",
          borderRadius: "10px"
        }}
      />
    </div>

    <p>
      {task.studyHours.toFixed(1)} /
      {task.targetHours} hrs completed
    </p>

  </div>
 <div className="task-actions">
  <button className="break-btn"
    disabled={
        task.remainingBreaks === 0 ||
        breakRunning ||
        !studyRunning
    }
  onClick={() => startBreak(task.id)}
>
  <span className="title-icon">☕</span>
  Take Break
</button>
<button className="study-btn"
  disabled={
    studyRunning &&
    currentTask?.id !== task.id
  }
  onClick={() => {
    console.log("Button clicked:", task);
    onTaskSelect(task);
    startStudy(task);
  }}
>
  {studyRunning
    ? currentTask?.id === task.id
      ? "⏳ Studying"
      : "🔒 Locked"
    : "▶ Start Study"}
</button>
<button className="delete-btn"
    onClick={() => deleteTask(task.id)}
>
    <span className="title-icon">🗑</span>
     Delete
</button>
</div>
</li>
      ))}
    </ul>
   
  </div>
  
);
}


export default TaskManager;