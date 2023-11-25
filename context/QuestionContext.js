import React, { createContext, useReducer } from "react";

export const QuestionsContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_NAME" : {
      let formObj = {...state}
      formObj.name = action.payload
      return formObj
    }

    case "CHANGE_DESCRIPTION" : {
      let formObj = {...state}
      formObj.description = action.payload
      return formObj
    }
    case "ADD_QUESTION": {
      let newArr = [...state.form];
      newArr.push({
        question: "Who am I?",
        options: [
          {
            value: "option1",
            id: crypto.randomUUID(),
          },
        ],
        answer: "",
        id: crypto.randomUUID(),
        required : false,
        type: "radio",
      });

      return {...state , form : newArr};
    }

    case "DELETE_QUESTION": {
      let newArr =  state.form.filter((question) => question.id !== action.payload.id);
      return {...state  , form : newArr}
    }

    case "UPDATE_REQUIRED" : {
      let newArr = state.form.map(question => {
        if(action.payload.id === question.id){
          question.required = action.payload.required
        }
        return question
      })
      return  {...state , form : newArr}
    }

    case "ADD_OPTION": {
      let newArr =  state.form.map((question) => {
        if (action.payload.id === question.id) {
          question.options.push({
            value: "",
            id: crypto.randomUUID(),
          });
        }
        return question;
      });
      return {...state , form : newArr}
    }



    case "DELETE_OPTION": {
      let newArr =  state.form.map((question) => {
        if (question.id === action.payload.quesId) {
          question.options = question.options.filter((option) => {
            return option.id !== action.payload.optionId;
          });
        }

        return question;
      });

      return {...state , form : newArr}
    }

    case "UPDATE_QUESTION": {
      let newForm = state.form.map((question) => {
        if (action.payload.id === question.id) {
          question.question = action.payload.question;
        }
        return question;
      });

      return {...state , form : newForm}
    }

    case "UPDATE_OPTION": {
      let newForm =  state.form.map((question) => {
        if (question.id === action.payload.quesId) {
          question.options = question.options.map((option) => {
            if (option.id === action.payload.optionId) {
              option.value = action.payload.value;
            }
            return option;
          });
        }

        return question;
      });
      return {...state , form : newForm}
    }

    case "CHANGE_TYPE": {
      let newForm =  state.form.map((question) => {
        if (question.id === action.payload.id) {
          if (question.type !== action.payload.type) {
            if (
              action.payload.type === "radio" ||
              action.payload.type === "checkbox"
            ) {
              return {
                question: question.question,
                id: question.id,
                options: [
                  {
                    value: "option",
                    id: crypto.randomUUID(),
                  },
                ],
                type: action.payload.type,
                answer: null,
              };
            }

            if (
              action.payload.type === "text" ||
              action.payload.type === "date" ||
              action.payload.type === "number" ||
              action.payload.type === "textarea"
            ) {
              return {
                question: question.question,
                id: question.id,
                settings: {
                  max: null,
                  min: null,
                  list: "",
                },
                type: action.payload.type,
              };
            }

            if (action.payload.type === "phone") {
              return {
                question: question.question,
                id: question.id,
                settings: {
                  pattern: null,
                  list: "",
                },
                type: action.payload.type,
              };
            }
          }
        }
        return question;
      });
      return {...state , form : newForm}
    }
    default:
      return state;
  }
}

const QuestionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    name : "Untitled",
    description : "",
    form : [
    ]
  });
  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionContextProvider;
