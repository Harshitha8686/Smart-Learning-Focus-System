function FocusScore({ sessions }) {

  const totalStudyTime = sessions.reduce(
    (sum, session) => sum + session.durationMinutes,
    0
  );

  const targetTime = 600; // 10 hours weekly target

  const focusScore = Math.round(
    (totalStudyTime / targetTime) * 100
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Focus Score</h2>

      <h1>{focusScore}%</h1>

      <p>Total Study Time: {totalStudyTime} mins</p>
    </div>
  );
}

export default FocusScore;