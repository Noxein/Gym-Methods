import React from 'react'

interface CheckBox extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    labelText: string,
}
export const CheckBox = ({labelText,className,...rest}:CheckBox) => {
  return (
    <div className='text-white flex items-center'>
        <input type="checkbox"  name={labelText} id={labelText} {...rest} className='bg-opacity-0 w-8 h-8 accent-green self-start'/>
        <label htmlFor={labelText}  className='pl-2 text-base text-gray-300'>{labelText}</label>
    </div>
  )
}
