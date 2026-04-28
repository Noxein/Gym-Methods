import { cn } from "../lib/cn"

interface CenterComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children:React.ReactNode
}

export const CenterComponent = ({children,className,...rest}:CenterComponentProps) => {
  return (
    <div className={cn('w-screen h-screen flex justify-center flex-col',className)} {...rest}>
        {children}
    </div>
  )
}
