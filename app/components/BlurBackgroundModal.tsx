import { cn } from '../lib/cn'

export const BlurBackgroundModal = ({children,className,...rest}:{children:React.ReactNode}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={cn('fixed left-0 top-0 w-screen min-h-screen z-20 backdrop-blur-sm flex justify-center items-center bg-dark bg-opacity-75',className)} {...rest}>
        {children}
    </div>
  )
}
