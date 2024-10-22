import React from 'react'

interface Input extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelName:string,
}

export const Input = ({labelName,...rest}:Input) => {
  return (
    <div className='relative w-full'>
        <label htmlFor={labelName} className='absolute -top-1/2 text-base bg-dark left-2 px-1'>{labelName}</label>
        <input type="text" id={labelName} {...rest} className='bg-dark border-1 border-marmur rounded-lg pl-2 py-2 w-full'/>
    </div>
  )
}
