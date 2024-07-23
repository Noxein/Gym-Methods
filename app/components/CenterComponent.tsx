import React from 'react'

export const CenterComponent = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        {children}
    </div>
  )
}