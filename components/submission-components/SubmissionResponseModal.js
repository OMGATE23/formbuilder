import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SubmissionResponseModal = ({response , submitHandler}) => {
    const router = useRouter()
    useEffect(() => {
        if(!response.errorOccured){
            router.push(`/form/success?id=${response.id}`)
        }
    } , [])
  return (
    <div className='outline outline-1'>
        <p>Submission Modal</p>
        {
            !response.errorOccured && (
                <div className='text-green-500'>
                    <p>Submitted Successfully!</p>
                    <p>Id : {response.id}</p>
                </div>
            )
        }
        {
            response.errorOccured && (
                <div className='text-red-400'>
                    <p>Oops! Something went wrong</p>
                    <button onClick={submitHandler}>Retry submission</button>
                </div>
            )
        }
    </div>
  )
}

export default SubmissionResponseModal