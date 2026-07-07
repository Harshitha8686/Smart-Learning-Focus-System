import "../styles/FocusScore.css";
function FocusScorePage({ focusScore })
 {
  return (
    <div className="focus-page">

    <h1 className="focus-title">  
        <span className="title-icon">🎯</span>
        Focus Score
    </h1>

    <p className="focus-subtitle">
        Your overall concentration and study performance.
    </p>

    <div className="focus-card">

        <div className="focus-left">

            <div className="focus-score">
                {focusScore}%
            </div>

            <div className="focus-status">

                {focusScore >= 90
                    ? "🟢 Excellent"
                    : focusScore >= 75
                    ? "🟢 Very Good"
                    : focusScore >= 60
                    ? "🟡 Good"
                    : "🔴 Needs Improvement"}

            </div>

            <div className="focus-progress">

                <div
                    className="focus-progress-fill"
                    style={{ width: `${focusScore}%` }}
                ></div>

            </div>

        </div>

        <div className="focus-right">  
            <span className="title-icon">🎯</span>
        </div>

    </div>

</div>
  );
}

export default FocusScorePage;