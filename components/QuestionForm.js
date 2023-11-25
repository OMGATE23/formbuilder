import { QuestionsContext } from '@/context/QuestionContext'
import React, { useContext, useState } from 'react'
import TypeDropDown from './TypeDropDown'
import Options from './Options'
import Delete from './misc/Delete'

const QuestionForm = ({question , index}) => {
    const {state , dispatch} = useContext(QuestionsContext)
  return (
    <div className='w-[80%] md:w-[60%] flex flex-col items-start gap-4 my-12 text-lg p-8 rounded-md shadow-md'>
        <div className='w-[100%]'>
            <TypeDropDown question={question}/>
            <div className='flex gap-4 items-center justify-between w-[100%]'>
                <label className='flex gap-4 w-full py-2'>
                    <input onChange={e => {
                        dispatch({
                            type : "UPDATE_QUESTION",
                            payload : {
                                id : question.id,
                                question : e.target.value
                            }
                        })
                    }} value = {question.question} className='border-b-2 border-gray-700 focus:border-none inline-block w-full py-2' />
                </label>
                
                <Delete onClickHandler={() => {
                    dispatch({
                        type : "DELETE_QUESTION",
                        payload : {
                            id : question.id
                        }
                    })
                }} disabled = {state.length <=1}/>

                
            </div>
            
            <div className='flex mt-4 flex-col gap-4'>
            {
                (question.type === 'checkbox' || question.type === 'radio') ? (
                    <div className='flex flex-col gap-4'>
                        {
                            question.options.map((option , index) => (
                                <Options key={option.id} type= {question.type} option = {option} index = {index} question = {question}/>
                            ))
                        }
                        <button 
                            className='inline-block w-[100%] bg-gray-100 rounded-md py-2 px-4 outline-1 shadow-lg max-w-[300px] cursor-pointer'
                            onClick={() => {
                                dispatch({
                                    type: "ADD_OPTION",
                                    payload : {
                                        id : question.id
                                    }
                                    
                                })
                            }}>Add another option...
                        </button>
                    </div>
                ) : (
                    question.type === "textarea" ? (
                        <textarea className='outline outline-1 w-full h-[4rem] rounded-md py-2 px-4 shadow-md'/>
                    ) : (
                        <input className='outline outline-1 w-full rounded-md py-2 px-4 shadow-md' type = {question.type} />
                    )
                )
            }
            </div>
        </div>
        
        <label className='w-[15%] text-[1rem] '>
            <input type='checkbox'  onClick={e => {
                dispatch({
                    type : "UPDATE_REQUIRED",
                    payload : {
                        id : question.id,
                        required : e.target.checked
                    }
                })
                
            }}
                className='mr-2'
            />
            Required?
        </label>
    </div>
  )
}

export default QuestionForm