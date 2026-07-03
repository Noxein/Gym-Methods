'use client'
import { cn } from '@/app/lib/cn'
import { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  labelClass?: string,
  labelBackground?: 'bg-dark' | 'borderInteractive' | 'bg-transparent',
  alwaysActive?: boolean
}

export const Input = ({ labelName, labelClass, value,labelBackground, alwaysActive, ...rest }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value && String(value).length > 0

  return (
    <fieldset
      className={cn(
        'w-full border-2  rounded-lg transition-colors',
        'border-borderInteractive bg-dark',
        isFocused && 'border-green/50'
      )}
    >
      <legend
        className={cn(
          'text-white transition-all duration-200 px-1',
          alwaysActive || isFocused || hasValue || rest.type === 'date'
            ? 'text-xs ml-4'
            : 'text-xs ml-4 text-gray-400',
          labelClass
        )}
      >
        {labelName}
      </legend>
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
          'w-full px-4 pb-2 bg-dark rounded-lg transition-colors',
          'text-white outline-none',
          'placeholder-transparent',
          'border-none',
          rest.className
        )}
        placeholder={labelName}
      />
    </fieldset>
  )
}
