'use client'
import React, { useContext , useEffect } from 'react'
import useLogin from '@/hooks/useLogin'
import { useAuthContext } from '@/hooks/useAuthContext'
import { redirect } from 'next/navigation'
const SignIn = () => {
    const {login} = useLogin()
    const {user} = useAuthContext()
    async function handleClick(){
        await login()
    }

    useEffect(() => {
        if(user){
          redirect('/submissions')
        } else {
          login()
        }
      } , [user])


  return (
    <div>
        <button
            onClick={handleClick}
        >Sign in with Google</button>
    </div>
  )
}

export default SignIn