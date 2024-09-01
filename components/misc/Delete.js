import React from 'react'

const Delete = ({onClickHandler , disabled}) => {
  return (
    <button disabled = {disabled} aria-label='delete button' className=' w-8 disabled:cursor-not-allowed' onClick={onClickHandler}>
        <img className='w-5 block' src='delete.svg' />
    </button>
  )
}

export default Delete