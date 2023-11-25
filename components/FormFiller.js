'use client'
import React, { useContext, useEffect, useState } from 'react'
import Radio from './form-input/Radio'
import Checkbox from './form-input/Checkbox'
import SingleLineText from './form-input/SingleLineText'
import MultilineText from './form-input/MultilineText'
import DateInput from './form-input/DateInput'
import Phone from './form-input/Phone'
import NumberInput from './form-input/NumberInput'
import { SubmissionContext } from '@/context/SubmissionContext'
import useFirestore from '@/hooks/useFirestore'
import { useRouter } from 'next/navigation'
import SubmissionResponseModal from './submission-components/SubmissionResponseModal'

const FormFiller = ({form , id , userId}) => {
    const [submitResponse , setSubmitResponse] = useState()
    const [requiredId , setRequiredId] = useState('')
    const {state , dispatch} = useContext(SubmissionContext)
    const {createSubmission} = useFirestore()
    const router = useRouter()
    function createSubmissionObject(){
        let contextArr = form.form.map(({id , question}) => {
            return {id , question , answer : ""}
        })
        dispatch({
            type : "CREATE_CONTEXT",
            payload : contextArr
        })
    }

    function submissionHandler(e){
        e.preventDefault()
        let requiredFields = form.form.filter(item => item.required)

        for(let i = 0 ; i < requiredFields.length ; i++){
            let stateObj = state.find((obj) => obj.id === requiredFields[i].id)
            if(!stateObj.answer){
                setRequiredId(stateObj.id)
                router.push(`${window.location.href.split('#')[0]}#${stateObj.id}`)
                
                return;
            }
        }
        createSubmission({
            formId : id,
            userId : userId,
            submission : state,
            submittedAt : Date.now()
        }, setSubmitResponse)
    }
    useEffect(() => {
        createSubmissionObject()
    } , [])

    
  return (
    <div className=' w-[100vw]'>
        <div className='form-information md:w-[60vw] mx-4 text-center'>
            <h1>{form.name ? form.name : "Untitled Form"}</h1>
            <h3>{form.description !== "Undescribed" ? form.description : ""}</h3>
        </div>
        <p className=' font-bold text-2xl'> {requiredId}</p>
        <form 
        className='submit-form flex flex-col items-left mx-auto gap-2 w-[100vw] md:w-[60vw]'
        >
        {
            form.form.map((item) => {
                switch(item.type){
                    case 'checkbox': return <Checkbox className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    case 'radio' : return <Radio className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    case 'date' : return <DateInput className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item}/>
                    case 'number' : return <NumberInput className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    case 'text' : return <SingleLineText className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    case 'textarea' : return <MultilineText className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    case 'phone' : return <Phone className='input-container' requiredId = {requiredId} key = {item.id} questionProp = {item} />
                    default : return <p></p>
                }
            })
        }
        <button 
            type = 'submit'
            className='block my-8 rounded-md mx-auto py-2 px-4 outline  outline-1' 
            onClick={submissionHandler}
            >
            Submit Response
        </button>
       
        </form>
       {
        submitResponse && <SubmissionResponseModal response = {submitResponse} submitHandler={submissionHandler} />
       }

    </div>
  )
}

export default FormFiller