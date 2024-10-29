import { cn } from '@/app/lib/cn'
import React, { HTMLAttributes } from 'react'

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isPrimary?: boolean,
    children: React.ReactNode
}
export const Button = ({isPrimary = false,children,className,...rest}:Button) => {

  if(isPrimary) return (
    <button {...rest} className={cn(`py-3 bg-green gradient-background-green-animation-on-disabled text-white text-center border-1 rounded-lg`,className)}>
      {children}
    </button>
  )

  return (
    <button {...rest} className={cn(`py-3 border-green gradient-background-green-animation-on-disabled text-green text-center border-1 rounded-lg font-semibold`,className)}>
      {children}
    </button>
  )
}
