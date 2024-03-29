'use client'
import FormBuilder from '@/components/FormBuilder'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import useLogin from '@/hooks/useLogin'
import { useLogout } from '@/hooks/useLogout'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const {user} = useAuthContext()
  const {logout} = useLogout()
  const {login} = useLogin()
  useEffect(() => {
    if(!user){
      login()
    }
  } , [user])
  return (
      <div className='max-w-[100vw]'>
        <UserHeader/>
        <FormBuilder/>
      </div>
  )
}
