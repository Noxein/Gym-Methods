'use client'
import { CreateAccountOrLogin } from './CreateAccountOrLogin' 

type FormWrapperTypes = {
  children:React.ReactNode,
  submitBtnText:string,
  hasAccount: boolean,
}

export const FormWrapper = ({children,submitBtnText,hasAccount}:FormWrapperTypes) => {

  return (
    <form className='flex flex-col rounded-xl px-6 py-10 gap-4 w-full items-cente justify-center mb-20' onSubmit={e=>e.preventDefault()}>

        {children}

        <CreateAccountOrLogin hasAccount={hasAccount}/>
    </form>
  )
}
