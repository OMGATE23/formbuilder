'use client'
import { Bars2Icon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const QuestionsList = ({formData, currentShownQuestion}) => {
  const router = useRouter()
  return (
    <div className='none md:block w-[30%] px-6 py-2 outline outline-1 outline-neutral-200 mt-4 rounded-md sticky top-8 shadow'>
      <h3 
        className='font-[500] text-base text-neutral-800 flex items-center gap-2 mb-2'
      >
        <Bars2Icon width={16} />
        {
        formData.name.length > 20 
          ? formData.name.substring(0, 20) + ' ...'
          : formData.name || '( Untitled )'
        }
      </h3>
      <ul className='list-decimal ml-10 flex flex-col gap-0.5 text-sm'>
        {
          formData.form.map((ques) => (
            <li 
            onClick={() => router.push(`#${ques.id}`)}
              key={ques.id}
              className={`cursor-pointer hover:text-neutral-700 ${ques.id === currentShownQuestion ? 'text-black font-normal' : 'text-neutral-500 font-light'}`}>
              <div className='flex items-start gap-1 pt-1'>
                {ques.question}
                {ques.required && <LockClosedIcon width={16} />}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default QuestionsList