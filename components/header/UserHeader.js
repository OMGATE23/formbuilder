import { useAuthContext } from '@/hooks/useAuthContext'
import { useLogout } from '@/hooks/useLogout'
import { redirect } from 'next/navigation'
import React from 'react'

const UserHeader = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
  return (
    <div>
        <div className='flex justify-between px-8 py-4 gap-8 items-center shadow-md'>
          <div className=''>
            <p className='text-2xl font-bold'>Hi, {user?.displayName.split(' ')[0]}!</p>
          </div>
          <button className='p-2 rounded-sm outline outline-1' onClick={async() => {
            await logout()
            redirect('/')
          }}>
            Logout
          </button>
        </div>
    </div>
  )
}

export default UserHeader