import React, { useContext, useState } from 'react'
import { CheckBadgeIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { QuestionsContext } from '@/context/QuestionContext'

const TypeDropDown = ({question}) => {
    const [show  , setShow] = useState(false)
    const {dispatch} = useContext(QuestionsContext)
    const typeList = [
        { value : 'radio' , title: 'Multiple choice'},
        {value : 'checkbox', title : 'Multiple answer'},
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
    <div className='text-[1rem] w-[80%] bg-gray-50 z-40 max-w-[300px] relative '>
        <div onClick={() => {
            setShow(prev => !prev)
        }} className='flex justify-between items-center relative z-10 gap-2 cursor-pointer px-4 py-2 rounded-md shadow-md'>
            <p >{types[question.type]} </p>
            <ChevronDownIcon 
                className={`h-6 ${show ? 'rotate-180' : 'rotate-0'} transition-all duration-200 `}
            /> 
        </div>
        <ul className={`transition-all duration-200 absolute w-full bg-white ${show ? ' translate-y-[0%] opacity-100' : 'translate-y-[-25%] absolute opacity-0  pointer-events-none'}`}>
            {
                typeList.map(({value , title}) =>(
                    <li 
                        className={`${question.type === value ? 'bg-gray-200' : ''} flex items-center gap-2 hover:bg-gray-200 rounded-xl py-1 px-2 cursor-pointer` }
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
                        }}
                    >
                        {question.type === value && <CheckIcon className='h-4'/>}
                        {title}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TypeDropDown