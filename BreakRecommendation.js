function BreakRecommendation({ sessions }) {

  const longestSession = Math.max(
    ...sessions.map(s => s.durationMinutes)
  );

  let message = "Keep studying!";

  if (longestSession >= 120) {
    message = "Take a 15 minute break";
  } else if (longestSession >= 60) {
    message = "Take a 10 minute break";
  } else if (longestSession >= 30) {
    message = "Take a 5 minute break";
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Break Recommendation</h2>
      <h3>{message}</h3>
    </div>
  );
}

export default BreakRecommendation;