import { cn } from '@/app/lib/cn'

interface ButtonWithIcon extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    buttonText: string,
    childrenIcon: React.ReactNode,
    isPrimary?: boolean,
}
export const ButtonWithIcon = ({buttonText,childrenIcon,className,isPrimary = false,...rest}:ButtonWithIcon) => {
  if(isPrimary){
    return(
      <button {...rest} className={cn('flex px-5 bg-green py-4 gradient-background-green-animation-on-disabled text-white rounded-lg',className)}>
        <div className='flex-1 text-left'>
            {buttonText}
        </div>
        {childrenIcon}
    </button>
    )
  }
  return (
    <button {...rest} className={cn('flex px-5 border-green border-1 text-green py-4 gradient-background-green-animation-on-disabled  disabled:text-white rounded-lg',className)}>
        <div className='flex-1 text-left'>
            {buttonText}
        </div>
        {childrenIcon}
    </button>
  )
}
