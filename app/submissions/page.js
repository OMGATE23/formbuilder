'use client'
import CreatedForms from '@/components/CreatedForms'
import Header from '@/components/header/Header'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import use, { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SubmissionsDashboard = () => {
  const {user, authIsReady} = useAuthContext()
  const router = useRouter()
  if(!authIsReady){
    return <></>
  }

  
  return (
    <div>
        {user && (
            <div>
                <UserHeader/>
                <CreatedForms/>
            </div>
        )}
        {
          !user && (
            router.push('/')
          )
        }
    </div>
  )
}

export default SubmissionsDashboard