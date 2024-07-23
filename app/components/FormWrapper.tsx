import React from 'react'

export const FormWrapper = ({children,headerLabel,submitBtnText,buttonFunc}:{children:React.ReactNode,headerLabel:string,submitBtnText:string,buttonFunc?:()=>void}) => {
  return (
    <form className='flex flex-col rounded-xl px-6 py-10 border-slate-600 border-2 gap-2 min-w-80'>

        <h2 className='self-center text-3xl pb-6'>{headerLabel}</h2>

        {children}

        <button type='submit' onClick={buttonFunc}  className='mt-4 py-2 px-4 bg-blue-400 rounded hover:bg-blue-500'>
            {submitBtnText}
        </button>

    </form>
  )
}
