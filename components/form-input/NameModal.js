import { QuestionsContext } from '@/context/QuestionContext'
import React, { useContext, useState } from 'react'

const NameModal = () => {
    const {state , dispatch} = useContext(QuestionsContext)
    const [show , setShow] = useState(true)
  return (
    <>
        {show && (<div className='fixed flex justify-center items-center top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[60px]'>
            <div className='w-[80%] md:w-[50%] flex flex-col items-center justify-center gap-4 bg-white py-12 shadow-md rounded-md'>
                <p className='text-3xl'>Welcome to <strong>Formify</strong></p>
                <label className='flex flex-col w-[80%] gap-4'>
                    <input 
                        onChange={e => dispatch({
                            type : "CHANGE_NAME",
                            payload : e.target.value
                        })} 
                        value={state.name} 
                        placeholder='Enter name of Form'
                        className='shadow-sm shadow-gray-200 py-2 px-4 outline outline-gray-200 outline-1' 
                    />
                </label>
                <button disabled = {!state.name} className='bg-black text-white py-2 px-4 text-xl rounded-md transition-all  disabled:bg-gray-700 disabled:cursor-not-allowed' onClick={() => {
                    if(state.name){
                        setShow(false)
                    }
                }}>Create</button>
            </div>
        </div>)}
    </>
  )
}

export default NameModal