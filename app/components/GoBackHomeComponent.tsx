import Link from 'next/link'
import React from 'react'

export const GoBackHomeComponent = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center'>
        <div>{children}</div>
        <div>
            <Link href={'/home'} className='text-blue-500 text-xl px-6 py-2'>Wróć na stronę główną</Link>
        </div>
    </div>
  )
}
