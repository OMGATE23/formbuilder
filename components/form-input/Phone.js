import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const Phone = ({questionProp , requiredId}) => {
  const {id , question} = questionProp
  const {dispatch} = useContext(SubmissionContext)
  const [ans, setAns] = useState(null)
  return (
    <div className='flex input-container gap-4'>
      <label className='question' htmlFor={id} >{question}{questionProp.required ?  '*' : ''}</label>
      <input 
        required = {questionProp.required}
        id = {id} 
        type = 'tel' 
        onChange={e => {
          dispatch({
            type : "ANSWER",
            payload : {
              id, answer : e.target.value
            }
          })
          setAns(e.target.value)
        }}
        className='shadow-sm'
      />
      {(requiredId === id && !ans) && <p className='text-red-400'>This is a required Field!</p>}
    </div>
  )
}

export default Phone