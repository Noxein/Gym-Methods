import { cn } from '@/app/lib/cn'
import React from 'react'

interface ErrorDiv extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    error?: string
}
export const ErrorDiv = ({error,className,...rest}:ErrorDiv) => {
    if(!error) return
  return (
    <div className={cn('text-[#db1d1d]',className)} {...rest}>{error}</div>
  )
}
