import { cn } from '@/app/lib/cn'

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    isPrimary?: boolean,
    children: React.ReactNode,
    blue?: boolean
}
export const Button = ({isPrimary = false,children,className,blue,...rest}:Button) => {

  if(isPrimary) return (
    <button {...rest} className={cn(`py-3 ${blue ? 'bg-blue-400 gradient-background-blue-animation-on-disabled' : 'bg-green gradient-background-green-animation-on-disabled'} text-white text-center rounded-lg`,className)}>
      {children}
    </button>
  )

  return (
    <button {...rest} className={cn(`py-3 ${blue ? 'border-blue-400 gradient-background-blue-animation-on-disabled text-blue-400' : 'border-green gradient-background-green-animation-on-disabled text-green'} text-center bg-dark border-1 rounded-lg font-semibold`,className)}>
      {children}
    </button>
  )
}
