import SubjectChart from "../SubjectChart";

function SubjectStudyPage({ sessions = [], tasks = [] }) {
  return (
    <div>
      
      <SubjectChart
        sessions={sessions}
        tasks={tasks}
      />
    </div>
  );
}

export default SubjectStudyPage;