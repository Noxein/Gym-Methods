import React, { useContext, useRef } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const InputGroup = ({id,text,type='text'}:{id:string,text:string,type?:string}) => {
  return (
    <div className='flex flex-col flex-1 relative text-white w-full'>
        <Label htmlFor={id}>{text}</Label>
        <Input type={type} id={id} name={id} />
    </div>
  )
}

type InputType = {

} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input = ({...rest}:InputType) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    const theme = useContext(ThemeContext)
    return(
        <input  className={`w-full text-${theme?.colorPallete.accent} border-white bg-${theme?.colorPallete.primary} border-[1px] min-h-10 text-lg rounded-lg pl-4 focus:outline-blue-500`} {...rest} ref={inputRef} onFocus={()=>{inputRef.current?.select()}}/>
    )
}

type LabelType = {
    sClass?:string
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

const Label = ({sClass,...rest}:LabelType) => {
    const theme = useContext(ThemeContext)

    return(
        <label htmlFor=""  className={`text-${theme?.colorPallete.accent} font-light absolute -top-1/3 left-2 bg-${theme?.colorPallete.primary} px-2 ${sClass}`} {...rest}></label>
    )
}