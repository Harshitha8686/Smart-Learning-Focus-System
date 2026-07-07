import "../styles/Sidebar.css";
function Sidebar({

activePage,

setActivePage

}) {
  return (
   <div
  style={{
    width: "260px",
    height: "100vh",
    background: "#111827",
    color: "white",

    position: "fixed",
    left: 0,
    top: 0,

    overflowY: "auto",      // enables scrolling
    overflowX: "hidden",
    padding: "20px",

    scrollbarWidth: "thin"  // Firefox
  }}
>
<h3

onClick={() => setActivePage("dashboard")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="dashboard"
? "#2563eb"
: "transparent"

}}

>

Dashboard

</h3>
<h3

onClick={() => setActivePage("pending")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="pending"
? "#2563eb"
: "transparent"

}}

>

Pending Tasks

</h3>
<h3

onClick={() => setActivePage("history")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="history"
? "#2563eb"
: "transparent"

}}

>Study History
</h3>
<h3
onClick={() => setActivePage("analytics")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="analytics"
? "#2563eb"
: "transparent"

}}>

Analytics Dashboard
</h3>
<h3
onClick={() => setActivePage("hours")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="hours"
? "#2563eb"
: "transparent"

}}>
Study Hours Chart
</h3>
<h3
onClick={() => setActivePage("completion")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="completion"
? "#2563eb"
: "transparent"

}}>
Task Completion Status
</h3>
<h3
onClick={() => setActivePage("focus")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="focus"
? "#2563eb"
: "transparent"

}}>
Focus Score</h3>

<h3
onClick={() => setActivePage("planner")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="planner"
? "#2563eb"
: "transparent"

}}>
      AI Study Planner</h3>
      <h3
onClick={() => setActivePage("weekly")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="weekly"
? "#2563eb"
: "transparent"

}}>Weekly Study Trend</h3>
      <h3
onClick={() => setActivePage("subject")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="subject"
? "#2563eb"
: "transparent"

}}>Subject Wise Study Time</h3>
      <h3
onClick={() => setActivePage("motivation")}

style={{
padding:"15px",
cursor:"pointer",
borderRadius:"8px",

background:
activePage==="motivation"
? "#2563eb"
: "transparent"

}}>AI Motivation</h3>
    </div>
  );
}

export default Sidebar;