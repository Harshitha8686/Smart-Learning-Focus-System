import { useState } from "react";

function StudyAssistant() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const askAI = () => {
  const q = question.toLowerCase();

  if (q.includes("java")) {
    setAnswer(
      "Java is an object-oriented programming language used for web, mobile, and enterprise applications."
    );
  }
  else if (q.includes("python")) {
    setAnswer(
      "Python is a high-level programming language known for simplicity and AI development."
    );
  }
  else if (q.includes("dbms")) {
    setAnswer(
      "DBMS is software used to store, manage, and retrieve data efficiently."
    );
  }
  else if (q.includes("operating system")) {
    setAnswer(
      "An Operating System manages hardware resources and provides services to applications."
    );
  }
  else if (q.includes("data structure")) {
    setAnswer(
      "Data structures organize and store data efficiently. Examples: Array, Linked List, Stack, Queue."
    );
  }
  else if (q.includes("study")) {
    setAnswer(
      "Use the Pomodoro Technique: 25 minutes study and 5 minutes break."
    );
  }
  else if (q.includes("html")) {
  setAnswer("HTML is used to create the structure of web pages.");
}
else if (q.includes("css")) {
  setAnswer("CSS is used to style and design web pages.");
}
else if (q.includes("javascript")) {
  setAnswer("JavaScript adds interactivity and dynamic behavior to websites.");
}
else if (q.includes("sql")) {
  setAnswer("SQL is used to store, retrieve and manage data in databases.");
}
else if (q.includes("machine learning")) {
  setAnswer("Machine Learning enables systems to learn patterns from data and make predictions.");
}
else if (q.includes("artificial intelligence")) {
  setAnswer("Artificial Intelligence enables machines to simulate human intelligence and decision making.");
}
  else {
    setAnswer(
      "Sorry, I don't have information on that topic yet."
    );
  }
};

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >
      <h2>🤖 AI Study Assistant</h2>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <button onClick={askAI}>
        Ask
      </button>

      <p>
        <strong>Answer:</strong>
        {" "}
        {answer}
      </p>
    </div>
  );
}

export default StudyAssistant;