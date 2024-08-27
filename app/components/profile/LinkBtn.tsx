'use client'
import { ThemeContext } from "@/app/context/ThemeContext"
import Link from "next/link"
import { useContext } from "react"
import { Icon } from "../Icon"

type LinkBtnTypes = {
  href:string,
  text:string,
  sClass?:string,
  children: React.ReactNode
}
export const LinkBtn = ({href,text,sClass,children}:LinkBtnTypes) => {
    const theme = useContext(ThemeContext)
    return(
      <Link href={href} className={`w-full ${sClass} bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} p-[1px] text-center rounded-lg text-xl flex`}>
        <span className={`bg-${theme?.colorPallete.primary} flex-1 py-3 rounded-lg`}>
          {text}
        </span>
        <Icon className="px-1 flex items-center">
          {children}
        </Icon>
      </Link>
    )
}
export const UserEmail = ({email}:{email:string}) => {
    const theme = useContext(ThemeContext)
    return(
        <h1 className={`mx-auto bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} w-full text-center py-4 text-xl mb-4 border-b-2 border-${theme?.colorPallete.secondary}`}>
            <div>{email}</div>
        </h1>
    )
}