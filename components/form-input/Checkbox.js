import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const Checkbox = ({questionProp , requiredId}) => {
  const {question , id  , options} = questionProp
  const [ans , setAns] = useState(null)
  const {dispatch} = useContext(SubmissionContext)
  return (
    <div className='input-container' id = {id}>
      <p className='question'>{question}{questionProp.required ?  '*' : ''}</p>
      {
        options.map((option) => (
          <div key = {option.id}>
            
            <label htmlFor={option.id}>
              <input required = {questionProp.required} onChange={e => {
                dispatch({
                  type : "ANSWER",
                  payload : {
                    id , answer : e.target.value
                  }
                })
                setAns(e.target.value)
              }} id  = {option.id} type='checkbox' />
              {option.value}
              </label>
          </div>
        ))
      }
      {(requiredId === id && !ans) && <p className='text-red-400'>This is a required field!</p>}
    </div>
  )
}

export default Checkbox