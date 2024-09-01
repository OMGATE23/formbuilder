import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'
import UserDetails from './UserDetails'

const UserHeader = () => {
    const {user} = useAuthContext()
    const router = useRouter()
    const {logout} = useLogout()
  return (
    <div>
        <div className='flex justify-between px-8 py-4 gap-8 items-center'>
          <div className=''>
            <p className='text-xl font-[500]'>Formify</p>
          </div>
          <UserDetails/>
        </div>
    </div>
  )
}

export default UserHeader