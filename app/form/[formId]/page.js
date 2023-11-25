'use client'
import FormFiller from '@/components/FormFiller'
import SubmissionContextProvider from '@/context/SubmissionContext'
import useFirestore from '@/hooks/useFirestore'
import React, { useEffect, useState } from 'react'

const Form = ({params}) => {
    const [formData , setFormData] = useState()
    const {getForm} = useFirestore()
    useEffect(() => {
        getForm(params.formId , setFormData)
        
    } , [])
  return (
    <div className=''>
        <SubmissionContextProvider>
          <div>
            {
              formData && (
                <>
                  {
                    !formData.error && (
                      <>
                      <FormFiller id = {params.formId} form = {formData?.form} userId = {formData.userId} />
                      </>
                    )
                  }
                  {
                    formData.error && (
                      <p>We werent able to fetch a form</p>
                    )
                  }
                </>
              )
            }
          </div>
          
        </SubmissionContextProvider>
    </div>
  )
}

export default Form