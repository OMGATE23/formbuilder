'use client'
import FormBuilder from '@/components/FormBuilder'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import useLogin from '@/hooks/useLogin'
import { useLogout } from '@/hooks/useLogout'
import { useEffect } from 'react'

export default function Home() {
  const context = useAuthContext()
  const {login} = useLogin()
  console.log(context)
  useEffect(() => {
    if(context.authIsReady && !context.user){
      login()
    }
  } , [context])

  if(!context.authIsReady){
    return <></>
  }
  return (
      <div className='max-w-[100vw] bg-white rounded-md outline outline-1 outline-neutral-100 shadow-sm pb-8'>
        <UserHeader/>
        <FormBuilder/>
      </div>
  )
}
