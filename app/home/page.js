'use client'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
    const {user} = useAuthContext()
    useEffect(() => {
        if(!user){
        redirect('/')
        }
    } , [user])
  return (
    <div className='h-[100vh]'>
        <UserHeader/>
        <div className='w-full h-[80%] flex flex-col md:flex-row gap-8 justify-center items-center'>
            <Link className='home-links shadow-md bg-teal-100 hover:bg-teal-100 md:bg-white' href='/create'>
                Create Form
            </Link>
            <Link className='home-links shadow-md bg-sky-100 hover:bg-sky-100 md:bg-white' href='/submissions'>
                See submissions
            </Link>
        </div>
    </div>
  )
}

export default Home