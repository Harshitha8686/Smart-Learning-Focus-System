import { useEffect, useState } from "react";

function StudyHistory() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/study/all")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div>
      <div className="history-page">
      <h2>
        <span className="title-icon">📚</span>
         Study History</h2>
      <div className="history-card">
      <table className="history-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Target Hours</th>
            <th>Date</th>
            <th>Studied Time</th>
          </tr>
        </thead>

        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td>{item.taskName}</td>
              <td>{item.targetHours}</td>
              <td>{item.date}</td>
              <td>{item.studiedTime} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

</div>
    </div>
  );
}

export default StudyHistory;