'use client'
import CreatedForms from '@/components/CreatedForms'
import Header from '@/components/header/Header'
import UserHeader from '@/components/header/UserHeader'
import { useAuthContext } from '@/hooks/useAuthContext'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const SubmissionsDashboard = () => {
    const {user} = useAuthContext()
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
            <>
              <Header/>
              <p>Sign in borther this aint you</p>
            </>
            
          )
        }
    </div>
  )
}

export default SubmissionsDashboard