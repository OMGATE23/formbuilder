import { ArrowDownIcon, ArrowDownOnSquareIcon, ShareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function SubmissionDisplay({formId, submissions , name }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://formifypro.vercel.app/form/${formId}`);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false)
      } , 5000)
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };
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
      <h2 className="text-center my-8 text-3xl font-bold text-gray-700">{name}</h2>
      <div className="flex flex-col items-center gap-4">
        <div className="buttons flex gap-4">
          <button
            className="flex items-center gap-2 outline outline-1 px-4 py-2 rounded-md cursor-pointer"
            onClick={downloadCSV}
          >
            Download CSV <ArrowDownOnSquareIcon width={24} />
          </button>
          <button 
          onClick={copyToClipboard}
          className={`flex items-center gap-2 outline outline-1 py-2 px-4 rounded-md ${isCopied ? "text-green-700" : "text-black"}`}>
            { isCopied ? "Copied" : 'Copy Form Link'} <ShareIcon width={24}/>
          </button>
        </div>
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
