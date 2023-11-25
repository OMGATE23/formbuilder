import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const NumberInput = ({questionProp , requiredId}) => {
  const {question , id} = questionProp
  const {dispatch} = useContext(SubmissionContext)
  const [ans ,  setAns] = useState(null)
  return (
    <div className='flex input-container gap-4'>
      <label className='question' htmlFor={id} >{question}{questionProp.required ?  '*' : ''}</label>
      <input 
        required = {questionProp.required}
        onChange={e => {
        dispatch({
          type : "ANSWER",
          payload : {
            id , answer : e.target.value
          }
        })
        setAns(e.target.value)
      }} id = {id} type = 'number' />
      {(requiredId === id && !ans) && <p className='text-400'>This is required field!</p>}
    </div>
  )
}

export default NumberInput