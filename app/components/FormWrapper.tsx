import React from 'react'

export const FormWrapper = ({children,headerLabel,submitBtnText}:{children:React.ReactNode,headerLabel:string,submitBtnText:string}) => {
  return (
    <form className='flex flex-col rounded-xl px-6 py-10 bg-slate-900 border-slate-600 border-2 gap-2'>

        <h2 className='self-center text-3xl pb-6'>{headerLabel}</h2>

        {children}

        <button type='submit' className='mt-4 py-2 px-4 bg-blue-400 rounded hover:bg-blue-500'>
            {submitBtnText}
        </button>
        
    </form>
  )
}
