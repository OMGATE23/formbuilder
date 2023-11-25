import React from "react";

export default function SubmissionDisplay({ submissions , name }) {
  const questions =
    submissions.length > 0
      ? submissions[0].submission.map((item) => item.question)
      : null;
  const downloadCSV = () => {
    const csvContent = [
      questions.join(","),
      ...submissions.map((submission) =>
        questions
          .map(
            (question) =>
              submission.submission.find((item) => item.question === question)
                ?.answer || ""
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form_submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <h2>{name}</h2>
      <div className="flex flex-col items-center gap-4">
        <button
          className="outline outline-1 px-4 py-2 rounded-md cursor-pointer"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
        <div className="w-[80%] mx-auto overflow-scroll">
          {questions && (
            <table className="mx-auto rounded-md shadow-md">
              <thead>
                <tr>
                  {questions.map((question, index) => (
                    <th
                      className="bg-gray-200 py-2  px-4 font-normal border-r-[1px] m-2"
                      key={index}
                    >
                      {question}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="submission-row-container">
                {submissions.map((submission) => (
                  <tr
                    className="my-2 text-center w-full odd:bg-gray-100"
                    key={submission.id}
                  >
                    {questions.map((question, index) => (
                      <td className="" key={index}>
                        {submission.submission.find(
                          (item) => item.question === question
                        )
                          ? submission.submission.find(
                              (item) => item.question === question
                            ).answer
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!questions && <p>No responses yet</p>}
      </div>
    </div>
  );
}
