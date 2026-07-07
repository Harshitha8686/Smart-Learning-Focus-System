import { useNavigate } from "react-router-dom";
import "../styles/TaskManager.css";
function QuickActions(){

const navigate = useNavigate();

return(

<div className="quick-actions">

<h2>
    <span className="title-icon">⚡</span>
     Quick Actions</h2>

<button onClick={()=>navigate("/planner")}>
<span className="title-icon">🤖</span>
 AI Planner
</button>

<button onClick={()=>navigate("/pomodoro")}>
    <span className="title-icon">🍅</span>
 Pomodoro
</button>

<button onClick={()=>navigate("/analytics")}>
    <span className="title-icon">📈</span>
 Analytics
</button>

<button onClick={()=>navigate("/study-history")}>
    <span className="title-icon">📚</span>
 History
</button>

</div>

);

}

export default QuickActions;