import { QuestionsContext } from '@/context/QuestionContext'
import React, { useContext, useState } from 'react'
import QuestionForm from './QuestionForm'
import useFirestore from '@/hooks/useFirestore'
import FormShareModal from './FormShareModal'
import CreatedForms from './CreatedForms'
import { useAuthContext } from '@/hooks/useAuthContext'
import FormDetails from './FormDetails'
import NameModal from './form-input/NameModal'
import { PlusIcon } from '@heroicons/react/24/outline'

const FormBuilder = () => {
    const {state , dispatch} = useContext(QuestionsContext)
    const [formStatus , setFormStatus] = useState()
    const [showFormStatusModal , setShowFormStatusModal] = useState(false)
    const {addForm} = useFirestore()
    const {user} = useAuthContext()
    async function formSubmitHandler(){
        
        let response = await addForm()
        setFormStatus(response)
        setShowFormStatusModal(true)
    }
  return (
    <div className=' min-h-[100vh] mb-12'>
        <NameModal/>
        
        <div className='flex flex-col items-center'>
            <FormDetails/>
            {
                state.form.map((ques , index) =>( 
                    <QuestionForm key = {ques.id} question = {ques} index = {index} />
                ))
            }
        </div>
        <div className=' w-[80vw] md:w-[60vw] mx-auto flex flex-col items-center gap-8'>
        <button
            onClick={() => {
                dispatch({
                    type : 'ADD_QUESTION'
                })
            }}
            className='mx-auto flex gap-2 rounded-md items-center text-gray-800 py-2 px-4 min-w-[200px] outline outline-1 text-2xl '
         >
           <PlusIcon width={24} /> Add a Question
        </button>


        <button
        onClick={formSubmitHandler}
        disabled = {state.form.length <= 0}
        className='text-2xl py-2 px-4 bg-black rounded-md text-white disabled:cursor-not-allowed'>
            Submit Form
        </button>
        </div>
        {
             showFormStatusModal&& formStatus  && (
                <>
                {formStatus && (
                    <div>
                        <FormShareModal  show = {setShowFormStatusModal} formStatus = {formStatus} />
                    </div>
                )}
                </>
            )
        }
        
    </div>
  )
}

export default FormBuilder