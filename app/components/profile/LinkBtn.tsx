'use client'
import { ThemeContext } from "@/app/context/ThemeContext"
import Link from "next/link"
import { useContext } from "react"

export const LinkBtn = ({href,text,sClass}:{href:string,text:string,sClass?:string}) => {
    const theme = useContext(ThemeContext)
    return(
      <Link href={href} className={`${sClass} mx-auto bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-[${theme?.colorPallete.secondary}] border-4 w-3/4 text-center rounded-md py-3 text-xl`}>
        {text}
      </Link>
    )
}
export const UserEmail = ({email}:{email:string}) => {
    const theme = useContext(ThemeContext)
    return(
        <h1 className={`mx-auto bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] w-full text-center py-4 text-xl mb-4 border-b-4 border-[${theme?.colorPallete.secondary}]`}>
            <div>Zalogowany jako</div>
            <div>{email}</div>
        </h1>
    )
}