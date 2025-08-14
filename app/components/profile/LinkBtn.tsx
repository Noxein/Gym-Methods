'use client'
import Link from "next/link"
import { Icon } from "../Icon"
import { useTranslations } from "next-intl"

type LinkBtnTypes = { 
  href:string,
  text:string,
  isNewFeature?: boolean,
  sClass?:string,
  children: React.ReactNode
}
export const LinkBtn = ({href,text,sClass,isNewFeature,children}:LinkBtnTypes) => {

  const u = useTranslations("Utils")
  
    if(isNewFeature) return (
      <Link href={href} className={`w-full ${sClass} bg-green-200 text-marmur border-green-200 border-2 text-center rounded-lg text-xl flex relative`}>
        <div className="absolute text-sm -top-2 left-2 bg-dark px-2"> {u('New')} !</div>
        <span className={`bg-dark flex-1 py-3 rounded-lg`}>
          {text}
        </span>
        <Icon className="px-1 flex items-center">
          {children}
        </Icon>
      </Link>
    )
    return(
      <Link href={href} className={`w-full ${sClass} bg-borderInteractive text-marmur border-borderInteractive border-2 text-center rounded-lg text-xl flex`}>
        <span className={`bg-dark flex-1 py-3 rounded-lg`}>
          {text}
        </span>
        <Icon className="px-1 flex items-center">
          {children}
        </Icon>
      </Link>
    )
}
export const UserEmail = ({email}:{email:string}) => {

    return(
        <h1 className={`mx-auto bg-dark text-marmur w-full text-center py-4 text-xl mb-4 border-b-2 border-marmur`}>
            <div>{email}</div>
        </h1>
    )
}