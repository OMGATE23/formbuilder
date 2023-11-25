import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
    <div className='hero-header flex px-12 py-4 items-center justify-between fixed top-0 shadow-sm shadow-gray-200 left-0 w-[100vw]'>
        <p className='text-3xl font-bold'>Formify</p>
        
        <Link className='text-xl outline outline-1 rounded-sm py-2 px-4' href='/signin'>Sign In</Link>
    </div>
    </>
  )
}

export default Header