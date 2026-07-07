function StudyStreak({ streak }) {
    return (
        <div className="streak-box">

            <div className="streak-icon">
                🔥
            </div>

            <div className="streak-content">
                <h4>Study Streak</h4>
                <h2>{streak} Days</h2>
            </div>

        </div>
    );
}

export default StudyStreak;