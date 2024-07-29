import React from 'react'

export const CenterComponent = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-screen h-screen flex items-center flex-col mt-36'>
        {children}
    </div>
  )
}
