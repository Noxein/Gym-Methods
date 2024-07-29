import { signIn } from '@/auth'
import React, { FormHTMLAttributes } from 'react'
import { Login } from '../actions'

export const FormWrapper = ({children,headerLabel,submitBtnText,buttonFunc,action}:{children:React.ReactNode,headerLabel:string,submitBtnText:string,buttonFunc?:()=>void,action?:string | ((formData: FormData) => void) | undefined}) => {
  return (
    <form className='flex flex-col rounded-xl px-6 py-10 gap-2 min-w-80 min-h-screen' action={action}>

        <h2 className='self-center text-3xl pb-6'>{headerLabel}</h2>

        {children}

        <button type='submit' onClick={e=>{buttonFunc && e.preventDefault();buttonFunc && buttonFunc()}}  className='py-2 px-4 bg-blue-400 rounded hover:bg-blue-500 mt-auto mb-16'>
            {submitBtnText}
        </button>

    </form>
  )
}
