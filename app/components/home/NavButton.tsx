import Link from 'next/link'
import React from 'react'

export const NavButton = ({text,href}:{text:string,href:string}) => {
  return (
    <Link href={href} className='w-full'>
        <div className='px-10 py-4 mx-auto bg-blue-500 w-11/12 text-center rounded-xl border-4 border-blue-300 text-white'>
            {text}
        </div>
    </Link>
  )
}
