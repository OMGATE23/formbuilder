import { QuestionsContext } from '@/context/QuestionContext'
import React, { useContext, useState } from 'react'
import QuestionForm from './QuestionForm'
import useFirestore from '@/hooks/useFirestore'
import FormShareModal from './FormShareModal'
import FormDetails from './FormDetails'
import { PlusIcon } from '@heroicons/react/24/outline'
import QuestionsList from './QuestionsList'

const FormBuilder = () => {
    const {state , dispatch} = useContext(QuestionsContext)
    const [formStatus , setFormStatus] = useState()
    const [showFormStatusModal , setShowFormStatusModal] = useState(false)
    const {addForm} = useFirestore()
    const [currentShownQuestion, setCurrentShownQuestion] = useState(null)
    async function formSubmitHandler(){
        
        let response = await addForm()
        setFormStatus(response)
        setShowFormStatusModal(true)
    }
  return (
    <div className=' min-h-[100vh] flex justify-evenly items-start px-8 gap-4'> 
        <QuestionsList 
          formData={state} 
          currentShownQuestion={currentShownQuestion}
          setCurrentQuestion={setCurrentShownQuestion}
        />
        <div className='w-[80%] md:w-[60%]'>
          <div className='flex flex-col'>
              <FormDetails/>
              {
                state.form.map((ques , index) =>( 
                  <QuestionForm 
                    key={ques.id} 
                    question={ques} 
                    index={index}
                    onVisible={(id) => setCurrentShownQuestion(id)}
                    currentQuesId={currentShownQuestion}
                   />
                ))
              }
          </div>
          <div className='flex justify-between items-center gap-8 mt-4'>
            <button
              onClick={() => {
                dispatch({
                    type : 'ADD_QUESTION'
                })
              }}
              className='cursor-pointer text-sm flex gap-2 rounded-md items-center bg-neutral-900 shadow-md text-white py-1.5 px-4 hover:shadow-lg hover:scale-105 transition-all duration-100'
            >
              <PlusIcon width={16} /> Add a Question
            </button>
            <button
              onClick={formSubmitHandler}
              disabled = {state.form.length <= 0}
              className='cursor-pointer text-neutral-800 hover:text-black hover:shadow-md hover:scale-105 transition-all duration-100 text-sm flex gap-2 rounded-md items-center shadow py-1.5 px-4 outline outline-1 outline-neutral-200'
            >
              Submit Form
            </button>
          </div>
          {
            showFormStatusModal && formStatus  && (
              <>
                {formStatus && (
                  <div>
                    <FormShareModal  
                      show = {setShowFormStatusModal} 
                      formStatus = {formStatus} 
                    />
                  </div>
                )}
              </>
            )
          }
          
        </div>
    </div>
  )
}

export default FormBuilder