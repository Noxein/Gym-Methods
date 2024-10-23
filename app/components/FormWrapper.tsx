'use client'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { CreateAccountOrLogin } from './CreateAccountOrLogin'
import { Button } from './ui/Button'

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
    <form className='flex flex-col rounded-xl px-6 py-10 gap-4 w-full items-cente justify-center mb-20' action={action}>

        <h2 className={`self-center text-3xl pb-6 text-white`}>{headerLabel}</h2>

        {children}

        <Button className='mt-4' isPrimary onClick={e=>{buttonFunc && e.preventDefault();buttonFunc && buttonFunc()}}>
          {submitBtnText}
        </Button>

        <CreateAccountOrLogin hasAccount={hasAccount}/>
    </form>
  )
}
