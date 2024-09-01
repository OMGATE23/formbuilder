import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import TypeDropDown from "./TypeDropDown";
import Options from "./Options";
import { TrashIcon } from "@heroicons/react/24/outline";

const QuestionForm = ({ question, onVisible, currentQuesId }) => {
  const { state, dispatch } = useContext(QuestionsContext);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries.filter(entry => entry.isIntersecting).map(entry => entry.target.id))
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onVisible(entry.target.id);
            console.log(entry.target.id)
          }
        });
      },
      { 
        threshold: 1,
        rootMargin: '40px 0px 40px 0px'
      } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [question.id, onVisible]);
  return (
    <div
      ref={ref} 
      id={question.id} 
      className=" flex flex-col items-start gap-4 my-4 p-8 rounded-md shadow outline outline-1 outline-neutral-200 font-[300]"
    >
      {question.id}
      <div className="w-[100%] flex flex-col gap-2">
        <TypeDropDown question={question} />
        <div className="w-[100%]">
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
              placeholder="Here goes the question..."
              className="text-base focus:border-none inline-block w-full px-4 py-1.5 my-2 rounded-md outline outline-1 outline-neutral-200"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
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
                className="inline-block w-[80%] rounded-md py-1 px-3 outline outline-1 outline-gray-200 shadow-sm max-w-[260px] cursor-pointer"
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
              className="outline outline-1 outline-gray-100 w-full rounded-md py-2 px-4 shadow-sm disabled:bg-neutral-50"
              type={question.type}
              placeholder="And here will come the answer here..."
              disabled
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
        className="text-sm flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed outline outline-1 outline-gray-200 transition-all duration-150 hover:outline-red-300 rounded-md hover:bg-red-200 py-1.5 px-3"
      >
        Delete Question
        <TrashIcon width={18}/>
      </button>
    </div>
  );
};

export default QuestionForm;
