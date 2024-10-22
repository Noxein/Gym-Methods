import { cn } from '@/app/lib/cn'
import React from 'react'

interface ButtonWithIcon extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    buttonText: string,
    childrenIcon: React.ReactNode,
}
export const ButtonWithIcon = ({buttonText,childrenIcon,className,...rest}:ButtonWithIcon) => {
  return (
    <button {...rest} className={cn('flex px-5 py-4 text-white rounded-lg',className)}>
        <div className='flex-1 text-left'>
            {buttonText}
        </div>
        {childrenIcon}
    </button>
  )
}
