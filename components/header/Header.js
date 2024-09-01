'use client'
import { useAuthContext } from '@/hooks/useAuthContext'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Header = () => {
  const {user, authIsReady} = useAuthContext()

  if(!authIsReady) {
    return <></>
  }

  return (
    <>
    <div className='hero-header flex px-12 py-4 items-center justify-between fixed top-0 left-0 w-[100vw]'>
        <p className='text-3xl font-bold'>Formify</p>
        
        {user 
          ? (
          <Link 
            className='text-md outline outline-1 py-1 px-4 font-normal bg-neutral-900 text-white rounded-md shadow-md' 
            href='/signin'
          >
            Sign In
          </Link>
          )
          : (
            <Link 
              className='text-md outline outline-1 py-1 px-4 font-normal bg-neutral-900 text-white rounded-md shadow-md' 
              href='/submissions'
            >
              Sign In
            </Link>
          )

      
      }
    </div>
    </>
  )
}

export default Header