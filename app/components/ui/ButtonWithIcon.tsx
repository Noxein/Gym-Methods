import { cn } from '@/app/lib/cn'

interface ButtonWithIcon extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    buttonText: string,
    childrenIcon: React.ReactNode,
    isPrimary?: boolean,
    loading?: boolean,
}
export const ButtonWithIcon = ({buttonText,childrenIcon,className,isPrimary = false,loading,...rest}:ButtonWithIcon) => {
  const isDisabled = Boolean(rest.disabled || loading)
  const buttonProps = { ...rest, disabled: isDisabled }
  const gradientClass = loading
    ? 'gradient-background-green-animation-on-disabled'
    : isDisabled
      ? 'gradient-background-green'
      : ''

  if(isPrimary){
    return(
      <button {...buttonProps} className={cn(`flex px-5 bg-green py-4 ${gradientClass} text-white rounded-lg`,className)}>
        <div className='flex-1 text-left'>
            {buttonText}
        </div>
        {childrenIcon}
    </button>
    )
  }
  return (
    <button {...buttonProps} className={cn(`flex px-5 border-green border-1 text-green py-4 ${gradientClass} disabled:text-white rounded-lg`,className)}>
        <div className='flex-1 text-left'>
            {buttonText}
        </div>
        {childrenIcon}
    </button>
  )
}
