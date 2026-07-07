import jsPDF from "jspdf";

function ReportGenerator({
  totalTasks,
  completedTasks,
  pendingTasks,
  studyHours,
  avgFocusScore
}) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "Smart Learning Focus System Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Total Tasks: ${totalTasks}`,
      20,
      50
    );

    doc.text(
      `Completed Tasks: ${completedTasks}`,
      20,
      70
    );

    doc.text(
      `Pending Tasks: ${pendingTasks}`,
      20,
      90
    );

    doc.text(
      `Study Hours: ${studyHours.toFixed(2)}`,
      20,
      110
    );

    doc.text(
      `Average Focus Score: ${avgFocusScore.toFixed(1)}%`,
      20,
      130
    );

    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      20,
      160
    );

    doc.save("SLFS_Report.pdf");
  };

  return (
    <button onClick={generatePDF}>
      Download PDF Report
    </button>
  );
}

export default ReportGenerator;