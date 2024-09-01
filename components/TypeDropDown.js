import React, { useContext, useState } from 'react'
import { CheckBadgeIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { QuestionsContext } from '@/context/QuestionContext'

const TypeDropDown = ({question}) => {
    const [show  , setShow] = useState(false)
    const {dispatch} = useContext(QuestionsContext)
    const typeList = [
        { value : 'radio' , title: 'Multiple choice'},
        {value : 'text', title : 'Single Line Answer'},
        {value : 'textarea', title : 'Multi Line Answer'},
        {value: 'date', title : 'Date'},
        {value : 'number', title : 'Number'},
        {value : 'phone', title : 'Phone'},
    ]
    const types = {
        radio : 'Multiple choice',
         checkbox: 'Multiple answer',
         text: 'Single Line Answer',
         textarea: 'Multi Line Answer',
         date: 'Date',
         number: 'Number',
         phone: 'Phone',
}
  return (
    <div className='text-sm w-fit min-w-[180px] px-1 outline outline-1 outline-gray-200 rounded-sm z-40 relative '>
        <div onClick={() => {
            setShow(prev => !prev)
        }} className='flex justify-between items-center relative z-10 gap-2 cursor-pointer px-1 py-1 rounded-md shadow-sm w-full'>
            <p>{types[question.type]} </p>
            <ChevronDownIcon 
                className={`h-4 ${show ? 'rotate-180' : 'rotate-0'} transition-all duration-200 `}
            /> 
        </div>
        <ul className={`left-0 transition-all duration-200 absolute w-full bg-white ${show ? 'h-full opacity-100' : 'h-0 absolute opacity-0 pointer-events-none'}`}>
            {
                typeList.map(({value , title}) =>(
                    <li 
                        className={`${question.type === value ? 'bg-gray-200' : 'bg-white'} flex items-center gap-2 hover:bg-gray-200 rounded-sm py-1 px-2 cursor-pointer` }
                        key ={value} 
                        value = {value}
                        onClick={() => {
                            dispatch({
                                type : "CHANGE_TYPE",
                                payload : {
                                    id : question.id,
                                    type : value
                                }
                            })
                          setShow(false)
                        }}
                    >
                        {question.type === value ? <CheckIcon className='h-4'/> : <div className='w-4' />}
                        {title}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TypeDropDown