import { cn } from '@/app/lib/cn'

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isPrimary?: boolean,
    children: React.ReactNode,
    blue?: boolean,
    loading?: boolean,
}
export const Button = ({isPrimary = false,children,className,blue,loading,...rest}:Button) => {
  const isDisabled = Boolean(rest.disabled || loading)
  const buttonProps = { ...rest, disabled: isDisabled }
  const gradientClass = loading
    ? (blue ? 'gradient-background-blue-animation-on-disabled' : 'gradient-background-green-animation-on-disabled')
    : isDisabled
      ? (blue ? 'gradient-background-blue' : 'gradient-background-green')
      : ''

  if(isPrimary) return (
    <button {...buttonProps} className={cn(`py-3 ${blue ? 'bg-blue-400' : 'bg-green'} ${gradientClass} text-white text-center rounded-lg`,className)}>
      {children}
    </button>
  )

  return (
    <button {...buttonProps} className={cn(`py-3 ${blue ? 'border-blue-400 text-blue-400' : 'border-green text-green'} ${gradientClass} text-center bg-dark border-1 rounded-lg font-semibold`,className)}>
      {children}
    </button>
  )
}
