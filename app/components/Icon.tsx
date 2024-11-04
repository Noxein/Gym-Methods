'use client'
 
export const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    
    return (
    <div className={`flex justify-center items-center bg-[dark] rounded-md my-1 ${sClass} cursor-pointer h-full px-1`} {...rest}>
      {children}
    </div>
    )
  }