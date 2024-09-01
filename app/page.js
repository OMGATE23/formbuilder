import Header from '@/components/header/Header'
import Link from 'next/link'
import React from 'react'

const Home = () => {

  return (
    <>
      <Header/>
      <div className='h-[100vh] flex flex-col md:flex-row justify-center items-center gap-12  md:gap-4'>
        
        <div className='hero-title flex flex-col items-center  md:items-start gap-4 w-[80%] md:w-[35%] text-center md:text-left'>
          <h1 className='text-7xl font-bold'>Formify</h1>
          <h2 className='text-xl w-[80%] text-gray-500'>Swiftly sculpt your ideas with our effortless form creator.</h2>
          
          <Link
            className='inline-block outline outline-1 text-lg py-1 px-4 text-white bg-black rounded-md hover:cursor-pointer transition-all hover:bg-slate-700' href='/home'
          >
            <div className='flex items-center gap-3 '>
            Join Us <img className='w-5 text-white' color='#fff' src='right-arrow.svg' />
            </div>
          </Link>
          
        </div>
        <img className='hero-img w-[75%] md:w-[40%]' src='mockup.png' />
      </div>
    </>
  )
}

export default Home