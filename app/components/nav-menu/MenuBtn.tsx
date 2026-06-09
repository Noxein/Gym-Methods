import { cn } from "@/app/lib/cn"
import Link from "next/link"
import { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react"

interface MenuBtnProps extends RefAttributes<HTMLAnchorElement>, AnchorHTMLAttributes<HTMLAnchorElement> {
    hrefTo: string,
    children: React.ReactNode
}

export const MenuBtn = ({hrefTo,children,...rest}:MenuBtnProps) => {
    return(
        <Link href={hrefTo} className={cn('flex-1 flex justify-center items-center', rest.className)} {...rest}>
            {children}
        </Link>
    )
}