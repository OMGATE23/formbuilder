import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext } from "react";
import Delete from "./misc/Delete";
const Options = ({ option, question , type}) => {
  const {dispatch} = useContext(QuestionsContext)
  return (
    <div className="flex items-center gap-4">
      <label className="flex gap-4 rounded-sm shadow-md py-2 px-4">
        <input disabled type = {type} name = {question} className=" scale-125"/>
        <input
          autoFocus
          contentEditable
          onInput={(e) => {
            dispatch({
              type: "UPDATE_OPTION",
              payload: {
                quesId: question.id,
                optionId: option.id,
                value: e.target.value,
              },
            });
          }}
          value = {option.value}
          className="block min-w-[200px] px-2"
        />
      </label>
      <Delete
        disabled={question.options.length <= 1}
        onClickHandler={() => {
          dispatch({
            type: "DELETE_OPTION",
            payload: {
              quesId: question.id,
              optionId: option.id,
            },
          });
        }}
        className="outline outline-1 px-2 disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-500 text-white cursor-pointer"
      />
      
    </div>
  );
};

export default Options;
