import React from 'react'

export const BlurBackgroundModal = ({children,...rest}:{children:React.ReactNode}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className='fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-sm flex justify-center items-center bg-dark bg-opacity-75' {...rest}>
        <div>{children}</div>
    </div>
  )
}
