import { QuestionsContext } from "@/context/QuestionContext";
import React, { useContext } from "react";

const FormDetails = () => {
  const { state, dispatch } = useContext(QuestionsContext);
  return (
    <div className="shadow-md my-4 flex flex-col items-start w-[80vw] md:w-[60vw] gap-4 p-6 rounded-md mx-auto ">
      
      <input
        onChange={(e) =>
          dispatch({
            type: "CHANGE_NAME",
            payload: e.target.value,
          })
        }
        value={state.name}
        placeholder="Enter name of Form"
        className="name w-[100%] block rounded-sm py-2 px-4 text-4xl font-bold"
      />
      <textarea
        onChange={(e) =>
          dispatch({
            type: "CHANGE_DESCRIPTION",
            payload: e.target.value,
          })
        }
        value={state.description}
        className="text-xl py-2 px-4 w-full rounded-sm"
        placeholder="Enter Description"
      />
    </div>
  );
};

export default FormDetails;
