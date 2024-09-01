import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext } from "react";
import Delete from "./misc/Delete";
const Options = ({ option, question , type}) => {
  const {dispatch} = useContext(QuestionsContext)
  return (
    <div className="flex items-center gap-4">
      <label className="flex gap-4 rounded-md shadow-sm outline outline-1 outline-gray-200 py-1 px-3">
        <input disabled type = {type} name = {question} className=" scale-125"/>
        <input
          autoFocus
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
          placeholder="Option name"
          className="block min-w-[200px] px-2 border-b border-white focus:border-b focus:border-neutral-200 outline-none"
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
