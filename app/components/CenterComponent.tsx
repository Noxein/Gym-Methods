import React from 'react'

export const CenterComponent = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-[calc(100vw-17px)] h-screen flex items-center flex-col'>
        {children}
    </div>
  )
}
