import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext } from "react";

const FormDetails = () => {
  const { state, dispatch } = useContext(QuestionsContext);
  return (
    <div className="outline outline-1 outline-neutral-200 shadow my-4 flex flex-col items-start gap-4 p-6 rounded-md">
      <input
        onChange={(e) =>
          dispatch({
            type: "CHANGE_NAME",
            payload: e.target.value,
          })
        }
        value={state.name}
        placeholder="Enter name of Form"
        className="name w-[100%] placeholder:font-[300] block rounded-sm py-2 px-4 text-lg font-[500]"
      />
      <textarea
        onChange={(e) =>
          dispatch({
            type: "CHANGE_DESCRIPTION",
            payload: e.target.value,
          })
        }
        value={state.description}
        className="text-md font-[300] py-2 px-4 w-full rounded-sm outline outline-neutral-200 outline-1 shadow-sm"
        placeholder="Enter Description"
      />
    </div>
  );
};

export default FormDetails;
