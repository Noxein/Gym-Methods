import React from 'react'

export const FormInputErrors = ({errors}:{errors?:(string|undefined)[]|undefined}) => {
  return (
    <div className='text-orange-600 my-2'>
        {errors?.map((err,index)=>(
            <div key={index}>
                {err}
            </div>
        ))}
    </div>
  )
}
