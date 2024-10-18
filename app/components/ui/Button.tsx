import { cn } from '@/app/lib/cn'
import React, { HTMLAttributes } from 'react'

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode
}
export const Button = ({children,className,...rest}:Button) => {
  return (
    <button {...rest} className={cn(`py-3 text-center border-1 rounded-lg`,className)}>
        {children}
    </button>
  )
}
