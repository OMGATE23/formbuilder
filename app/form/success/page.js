'use client'
import {useSearchParams } from 'next/navigation'
import React from 'react'

const Sucess = () => {
    const params = useSearchParams()
  return (
    <div className='w-full h-[100vh] bg-slate-100 flex justify-center items-center'>
        <div className='max-w-[80%]  flex flex-col gap-4 items-center outline outline-1 p-8 rounded-xl'>
          <h1 className='text-2xl font-bold text-blue-950 md:text-3xl'>Form Submitted Successfully</h1>
          <p className='text-xl '>Thank you so much for using Formify!</p>
          <p>Submission Id : {params.get('id')}</p>
        </div>
    </div>
  )
}

export default Sucess