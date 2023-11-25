import { SubmissionContext } from '@/context/SubmissionContext'
import React, { useContext, useState } from 'react'

const Radio = ({questionProp , requiredId}) => {
  const {id , question , options} = questionProp
  const [ans , setAns] = useState('')
  const {dispatch} = useContext(SubmissionContext)
  
  return (
    <div id = {id} className='my-4 input-container' >
      
      <p className='question'>{question}{questionProp.required ?  '*' : ''}</p>
      <div className='flex flex-col gap-4 '>
        {
          options.map((option) => (
            
              <label key = {option.id} htmlFor={option.id} className='shadow-sm radio-label'>
              <input 
                required = {questionProp.required}
                value={option.value} onChange={e => {
                dispatch({
                  type : "ANSWER",
                  payload : {
                    id , answer : e.target.value
                  }
                })
                setAns(e.target.value)
              }} id = {option.id} type = 'radio' name = {id} className='px-2 block ' />
              {option.value}</label>
            
          ))
        }
      </div>
      
      {(requiredId === id && !ans) && <p className=' text-red-600'>Field is required!</p>}
    </div>
  )
}

export default Radio