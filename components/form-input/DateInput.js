import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const DateInput = ({questionProp , requiredId}) => {
  const {question , id} = questionProp
  const {dispatch} = useContext(SubmissionContext)
  const [ans , setAns] = useState(null)
  return (
    <div className='flex input-container gap-4'>
      <label className='question' htmlFor={id} >{question}{questionProp.required ?  '*' : ''}</label>
      <input  
        required = {questionProp.required}
        id = {id} 
        type = 'date' 
        className='shadow-sm'
        onChange={e => {
          dispatch({
            type : "ANSWER",
            payload : {
              id , answer : e.target.value
            }
          })
          setAns(e.target.value)
        }}
      />
      {(requiredId === id && !ans) && <p className='text-red-400'>This is a required field!</p>}
    </div>
  )
}

export default DateInput