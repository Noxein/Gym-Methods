import React from 'react'

export const FormInputErrors = ({errors}:{errors?:string[]|undefined}) => {
  return (
    <div className='text-red-500'>
        {errors?.map((err,index)=>(
            <div key={index}>
                {err}
            </div>
        ))}
    </div>
  )
}
