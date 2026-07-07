import { useEffect, useState } from "react";

function StudentRanking() {

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:8080/api/students"
    )
      .then((res) => res.json())
      .then((data) => {

        const sorted =
          data.sort(
            (a, b) =>
              b.studyHours -
              a.studyHours
          );

        setStudents(sorted);
      });

  }, []);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        marginTop: "20px"
      }}
    >
      <h2>🏆 Student Rankings</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Study Hours</th>
          </tr>
        </thead>

        <tbody>

          {students.map(
            (student, index) => (
              <tr key={student.id}>
                <td>
                  {index + 1}
                </td>

                <td>
                  {student.name}
                </td>

                <td>
                  {student.studyHours}
                </td>
              </tr>
            )
          )}

        </tbody>
      </table>
    </div>
  );
}

export default StudentRanking;