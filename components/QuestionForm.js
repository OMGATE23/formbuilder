import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext, useState } from "react";
import TypeDropDown from "./TypeDropDown";
import Options from "./Options";
import Delete from "./misc/Delete";
import { TrashIcon } from "@heroicons/react/24/outline";

const QuestionForm = ({ question, index }) => {
  const { state, dispatch } = useContext(QuestionsContext);
  return (
    <div className="w-[80%] md:w-[60%] flex flex-col items-start gap-4 my-12 text-lg p-8 rounded-md shadow-md">
      <div className="w-[100%]">
        <TypeDropDown question={question} />
        <div className="flex gap-4 items-center justify-between w-[100%]">
          <label className="flex gap-4 w-full py-2">
            <input
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_QUESTION",
                  payload: {
                    id: question.id,
                    question: e.target.value,
                  },
                });
              }}
              value={question.question}
              className="focus:border-none inline-block w-full p-2 my-2 rounded-md outline outline-1 outline-gray-400"
            />
          </label>
        </div>

        <div className="flex mt-4 flex-col gap-4">
          {question.type === "checkbox" || question.type === "radio" ? (
            <div className="flex flex-col gap-4">
              {question.options.map((option, index) => (
                <Options
                  key={option.id}
                  type={question.type}
                  option={option}
                  index={index}
                  question={question}
                />
              ))}
              <button
                className="inline-block w-[100%] rounded-md py-2 px-4 outline outline-1 outline-gray-200 shadow-sm max-w-[300px] cursor-pointer"
                onClick={() => {
                  dispatch({
                    type: "ADD_OPTION",
                    payload: {
                      id: question.id,
                    },
                  });
                }}
              >
                Add another option...
              </button>
            </div>
          ) : question.type === "textarea" ? (
            <textarea 
                className="outline  outline-1 outline-gray-100 w-full h-[4rem] rounded-md py-2 px-4 shadow-sm" 
                placeholder="Answer here..."
                />
          ) : (
            <input
              className="outline outline-1 outline-gray-100 w-full rounded-md py-2 px-4 shadow-sm"
              type={question.type}
              placeholder="Answer here..."
            />
          )}
        </div>
      </div>

      <label className="w-[15%] text-[1rem] ">
        <input
          type="checkbox"
          onClick={(e) => {
            dispatch({
              type: "UPDATE_REQUIRED",
              payload: {
                id: question.id,
                required: e.target.checked,
              },
            });
          }}
          className="mr-2"
        />
        Required?
      </label>
      <button
        onClick={() => {
          dispatch({
            type: "DELETE_QUESTION",
            payload: {
              id: question.id,
            },
          });
        }}
        disabled={state.length <= 1}
        className="flex items-center gap-4 disabled:bg-gray-300 disabled:cursor-not-allowed outline outline-1 outline-gray-200 transition-all duration-150 hover:outline-red-400 rounded-md hover:bg-red-200 p-2 "
      >
        Delete Question
        <TrashIcon width={24}/>
      </button>
    </div>
  );
};

export default QuestionForm;
