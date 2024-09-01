import { useAuthContext } from '@/hooks/useAuthContext';
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'

const UserDetails = () => {
  const [show, setShow] = useState(false);
  const {user} = useAuthContext()
  const ref = useRef()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  } , [])
  return (
    <div className='relative'>
      <button 
        onClick={() => setShow(prev => !prev)}
        aria-label='User Details' 
        className='w-7 h-7 flex items-center justify-center rounded-full outline outline-1 outline-neutral-900' 
      >
        <UserIcon width={20}/>
      </button>
      {show && (
        <div ref={ref} className='absolute top-10 right-0 rounded-md outline outline-1 py-2 px-2 outline-neutral-300 shadow flex flex-col gap-4 w-40 text-center'>
          <p className='font-[500]'>{user.displayName}</p>
          <div className='flex flex-col gap-2'>
            <button className='font-[300] text-sm flex gap-2 items-center'>
              <ArrowsRightLeftIcon width={16}/> Switch Account
            </button>
            <button className='font-[300] text-sm flex gap-2 items-center text-red-500'>
              <ArrowLeftOnRectangleIcon width={16}/> Logout
            </button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default UserDetails