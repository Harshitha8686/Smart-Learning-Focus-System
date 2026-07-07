import { useState, useEffect } from "react";
import "../styles/WebsiteBlocker.css";
function WebsiteBlocker({
    studyRunning,
    setWebsiteDiscipline
}) {

    const [blockedCount, setBlockedCount] = useState(0);

    const blockedSites = [
        "YouTube",
        "Instagram",
        "Facebook",
        "Netflix",
        "Twitter"
    ];

    useEffect(() => {

        const score =
            Math.max(0, 100 - blockedCount * 10);

        if (setWebsiteDiscipline) {
            setWebsiteDiscipline(score);
        }

    }, [blockedCount, setWebsiteDiscipline]);

    return (
    <div className={`blocker-card ${studyRunning ? "active" : "inactive"}`}>

        <div className="blocker-header">

            <div className="blocker-title">
                <span className="title-icon">🛡</span>
                Website Blocker
            </div>

            <div className={`blocker-status ${studyRunning ? "on" : "off"}`}>
                <span className="status-dot"></span>
                {studyRunning ? "ACTIVE" : "OFF"}
            </div>

        </div>

        <p className="blocker-text">
            {studyRunning
                ? "Focus Mode is enabled. Distracting websites are currently blocked."
                : "Start a study session to activate website blocking."
            }
        </p>
        {studyRunning && (
    <>
        <div className="blocker-info">

            

            <div className="info-box">
                <h4>Discipline</h4>
                <span>{Math.max(0, 100 - blockedCount * 10)}%</span>
            </div>

        </div>

        <div className="blocked-sites">

            {blockedSites.map((site) => (
                <span key={site}>
                    🚫 {site}
                </span>
            ))}

        </div>
    </>
)}
</div>
);
}

export default WebsiteBlocker;