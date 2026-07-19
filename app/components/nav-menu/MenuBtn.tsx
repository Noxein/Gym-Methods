import { cn } from "@/app/lib/cn"
import { HideShowHTMLScrollbar } from "@/app/lib/utils"
import Link from "next/link"
import { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react"

interface MenuBtnProps extends RefAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement> {
    hrefTo: string,
    children: React.ReactNode
}

export const MenuBtn = ({hrefTo,children,...rest}:MenuBtnProps) => {
    const showHtmlScroll = () => HideShowHTMLScrollbar('show')
    return(
        <Link href={hrefTo} className={cn('flex-1 flex justify-center items-center', rest.className)} {...rest} onClick={showHtmlScroll}>
            {children}
        </Link>
    )
}