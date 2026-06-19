'use client'
import { cn } from '@/app/lib/cn'
import { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  labelClass?: string,
  labelBackground?: 'bg-dark' | 'borderInteractive' | 'bg-transparent'
}

export const Input = ({ labelName, labelClass, value,labelBackground, ...rest }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && String(value).length > 0

  return (
    <div className="relative w-full">
      <input
        {...rest}
        value={value}
        onFocus={(e) => {
          setIsFocused(true)
          rest.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          rest.onBlur?.(e)
        }}
        className={cn(
          'w-full px-4 py-2 border-2 bg-dark border-borderInteractive rounded-lg transition-colors',
          'text-white outline-none',
          'placeholder-transparent',
          isFocused && 'border-green/50',
          rest.className
        )}
        placeholder={labelName}
      />
      
      {rest.type === 'date' ? 
      <label
        className={cn(
          'absolute left-4 text-white transition-all duration-200 pointer-events-none',
          'origin-top-left',
          `top-0 text-xs scale-75 -translate-y-2 px-1 ${labelBackground || 'bg-dark'}`,
          labelClass
        )}
      >
        {labelName}
      </label>
       :     
      <label
        className={cn(
          'absolute left-4 text-white transition-all duration-200 pointer-events-none',
          'origin-top-left',
          isFocused || hasValue
            ? `top-0 text-xs scale-75 -translate-y-2 px-1 ${labelBackground || 'bg-dark'}`
            : 'top-2.5 text-base',
          labelClass
        )}
      >
        {labelName}
      </label>
    }

    </div>
  )
}
