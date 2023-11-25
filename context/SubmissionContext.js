import React, { createContext, useReducer } from 'react'

export const SubmissionContext = createContext()

function submissionReducer(state , action){
    switch(action.type){
        case "CREATE_CONTEXT": {
            return action.payload
        }

        case "ANSWER" : {
            return state.map(submission => {
                if(submission.id === action.payload.id){
                    submission.answer = action.payload.answer
                }
                return submission
            })
        }

        default : return state
    }
}

const SubmissionContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(submissionReducer , null)
  return (
    <SubmissionContext.Provider value={{state , dispatch}}>
        {children}
    </SubmissionContext.Provider>
  )
}

export default SubmissionContextProvider