import { useMemo } from "react";
import "./styles/Motivation.css";
import StudyStreak from "./StudyStreak";
function Motivation({
    sessions = [],
    tasks = [],
    streak = 0
}) {
    const quotes = [
{
text:"Success is the sum of small efforts repeated every day.",
author:"Robert Collier"
},
{
text:"Push yourself because no one else is going to do it for you.",
author:"Unknown"
},
{
text:"Discipline is choosing between what you want now and what you want most.",
author:"Abraham Lincoln"
},
{
text:"Small progress is still progress.",
author:"Unknown"
},
{
text:"Dream big. Start small. Act now.",
author:"Robin Sharma"
},
{
text:"Today's effort becomes tomorrow's success.",
author:"Unknown"
},
{
text:"The future depends on what you do today.",
author:"Mahatma Gandhi"
},
{
text:"Consistency beats motivation.",
author:"Unknown"
},
{
text:"Study while others are sleeping.",
author:"William A. Ward"
},
{
text:"Don't stop until you're proud.",
author:"Unknown"
},
{
text:"One chapter today, one step closer to your dream.",
author:"Unknown"
},
{
text:"Learning never exhausts the mind.",
author:"Leonardo da Vinci"
},
{
text:"Success doesn't come from what you do occasionally, it comes from what you do consistently.",
author:"Marie Forleo"
},
{
text:"Your future is created by what you do today.",
author:"Robert Kiyosaki"
},
{
text:"Do something today that your future self will thank you for.",
author:"Sean Patrick Flanery"
},
{
text:"The expert in anything was once a beginner.",
author:"Helen Hayes"
},
{
text:"Don't watch the clock; do what it does. Keep going.",
author:"Sam Levenson"
},
{
text:"Great things never come from comfort zones.",
author:"Unknown"
},
{
text:"Every page you read is an investment in your future.",
author:"Unknown"
},
{
text:"Be stronger than your excuses.",
author:"Unknown"
},
{
text:"Stay focused and never give up.",
author:"Unknown"
},
{
text:"Education is the passport to the future.",
author:"Malcolm X"
},
{
text:"Work hard in silence, let success make the noise.",
author:"Frank Ocean"
},
{
text:"Your only limit is your mind.",
author:"Unknown"
},
{
text:"Knowledge grows when shared and practiced.",
author:"Unknown"
},
{
text:"Difficult roads often lead to beautiful destinations.",
author:"Zig Ziglar"
},
{
text:"Learn today, lead tomorrow.",
author:"Unknown"
}

];

    const today = new Date().toISOString().split("T")[0];
    const quote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
}, []);

    // Today's sessions
    const todaySessions = sessions.filter(
        s => s.date === today
    );

    // Total sessions
    const totalSessions = sessions.length;

    // Total study minutes
    const totalMinutes = sessions.reduce(
        (sum, s) => sum + s.studiedTime,
        0
    );

    const totalHours = (totalMinutes / 60).toFixed(1);

    // Target Hours
    const targetHours = tasks.reduce(
        (sum, t) => sum + t.targetHours,
        0
    );

    // Focus Score
    const focusScore =
        targetHours === 0
            ? 0
            : Math.round(
                (totalHours / targetHours) * 100
            );

    // Weekly Progress
    const progress =
        targetHours === 0
            ? 0
            : Math.min(
                100,
                (totalHours / targetHours) * 100
            );

    return (

<div className="motivation-grid">

    {/* Left Card */}

    <div className="motivation-card">

        <div className="quote">
    "{quote.text}"
</div>

<div className="quote-author">
    — {quote.author}
</div>

       

    </div>


     <br />

    
    <div className="stats">

<div className="stats">

    <div className="stat-box">

    <div className="stat-icon">
        👥
    </div>

    <div className="stat-content">
        <h4>Total Sessions</h4>
        <h2>{totalSessions}</h2>
    </div>

</div>

    <div className="stat-box">
        <h4>Study Hours</h4>
        <h2>{totalHours} h</h2>
    </div>

    <div className="stat-box">
        <h4>Focus Score</h4>
        <h2>{focusScore}%</h2>
    </div>

    <StudyStreak streak={streak} />

</div>

</div>

</div>
);
}

export default Motivation;