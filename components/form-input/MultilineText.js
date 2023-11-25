import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const MultilineText = ({questionProp , requiredId}) => {
  const {question , id} = questionProp
  const {dispatch} = useContext(SubmissionContext)
  const [ans , setAns] = useState(null)
  return (
    <div className='input-container'>
      <label  htmlFor={id} className='flex flex-col question'>
        {question}{questionProp.required ?  '*' : ''}
        <textarea 
          id={id}
          required = {questionProp.required}
          className='
            outline outline-1 outline-slate-200 shadow-sm w-[60vw] h-[5rem] rounded-md p-4 py-2
          '
          onChange={e => {
            dispatch({
              type : "ANSWER",
              payload : {
                id , answer : e.target.value
              }
            })
            setAns(e.target.value)
          }}

        
        ></textarea>
      </label>
      {(requiredId === id && !ans) && <p className='text-red-400'>This is a required field!</p>}
    </div>
  )
}

export default MultilineText