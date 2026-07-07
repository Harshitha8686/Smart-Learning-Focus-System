import Motivation from "../Motivation";


function MotivationPage({
    sessions,
    tasks,
    streak
}) {

  return (
    <>
      <div className="motivation-wrapper">

    <Motivation
        sessions={sessions}
        tasks={tasks}
        streak={streak}
    />

</div>
    </>
  );

}

export default MotivationPage;