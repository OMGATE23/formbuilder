'use client'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import useLogin from '@/hooks/useLogin'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
    const {user} = useAuthContext()
    const {login} = useLogin()
    console.log(user)
    useEffect(() => {
        if(!user){
            login()
            console.log('NO user detected at home')
        }
    } , [])

  return (
    <div className='h-[100vh]'>
        {user && <>
            <UserHeader/>
            <div className='w-full h-[80%] flex flex-col md:flex-row gap-8 justify-center items-center text-center'>
                <Link className='home-links shadow-md bg-teal-100 hover:bg-teal-100 md:bg-white' href='/create'>
                    Create Form
                </Link>
                <Link className='home-links shadow-md bg-sky-100 hover:bg-sky-100 md:bg-white' href='/submissions'>
                    See submissions
                </Link>
            </div>
        </>}
        {
            !user && (
                <div className='w-[100vw] h-full flex items-center justify-center'>
                    <div className='flex flex-col gap-4 text-center'>
                    <p>Oops! No user detected.</p>
                    <p>{`Don't worry try loging back in`}</p>
                    <button className='outline outline-1 py-2 px-4 rounded-md' onClick={login}>Login</button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Home