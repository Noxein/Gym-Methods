'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { CreateAccountOrLogin } from './CreateAccountOrLogin'

type FormWrapperTypes = {
  children:React.ReactNode,
  headerLabel:string,
  submitBtnText:string,
  buttonFunc?:()=>void,action?:string | ((formData: FormData) => void) | undefined,
  hasAccount: boolean
}

export const FormWrapper = ({children,headerLabel,submitBtnText,buttonFunc,action,hasAccount}:FormWrapperTypes) => {
  const theme = useContext(ThemeContext)
  return (
    <form className='flex flex-col rounded-xl px-6 py-10 gap-2 w-full items-cente justify-center mb-20' action={action}>

        <h2 className={`self-center text-3xl pb-6 text-white`}>{headerLabel}</h2>

        {children}

        <button type='submit' onClick={e=>{buttonFunc && e.preventDefault();buttonFunc && buttonFunc()}}  className={`w-full py-2 px-4 border-1 border-white text-white bg-green rounded`}>
            {submitBtnText}
        </button>

        <CreateAccountOrLogin hasAccount={hasAccount}/>
    </form>
  )
}
