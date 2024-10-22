import { cn } from '@/app/lib/cn'
import React, { HTMLAttributes } from 'react'

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isPrimary: boolean,
    children: React.ReactNode
}
export const Button = ({isPrimary,children,className,...rest}:Button) => {

  if(isPrimary) return (
    <button {...rest} className={cn(`py-3 bg-green disabled:bg-gray-400 disabled:text-white text-white text-center border-1 rounded-lg`,className)}>
      {children}
    </button>
  )

  return (
    <button {...rest} className={cn(`py-3 border-green disabled:bg-gray-400 disabled:text-white text-green text-center border-1 rounded-lg`,className)}>
      {children}
    </button>
  )
}
