'use client'
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
 
export const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const theme = useContext(ThemeContext)
    
    return (
    <div className={`flex justify-center items-center bg-[${theme?.colorPallete.primary}] rounded-md my-1 ${sClass} cursor-pointer h-full px-1`} {...rest}>
      {children}
    </div>
    )
  }