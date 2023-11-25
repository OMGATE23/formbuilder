import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const SingleLineText = ({questionProp , requiredId}) => {
  const {id , question} = questionProp
  const {dispatch} = useContext(SubmissionContext)
  const [ans , setAns] = useState(null)
  return (
    <div className='input-container'>
      <label className='question' htmlFor={id} >{question}{questionProp.required ?  '*' : ''}</label>
      <input onChange={e => {
        dispatch({
          type : "ANSWER",
          payload : {
            id , answer : e.target.value
          }
        })
        setAns(e.target.value)
      }}  required = {questionProp.required} className='bg-white outline outline-1 shadow-sm' type='text' id = {id} />
      {(requiredId === id && !ans) && <p className='text-red-400'>This is field is required!</p>}
    </div>
  )
}

export default SingleLineText