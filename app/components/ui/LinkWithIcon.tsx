import { cn } from '@/app/lib/cn'
import Link, { LinkProps } from 'next/link'
import React, { HTMLProps } from 'react'

type LinkWithIcon = {
    linkText: string,
    childrenIcon?: React.ReactNode,
    centerText?: boolean,
    
} & LinkProps & HTMLProps<HTMLAnchorElement>

export const LinkWithIcon = ({linkText,childrenIcon,centerText = false,className,...rest}:LinkWithIcon) => {
  return (
    <Link {...rest} className={cn('flex px-5 py-3 text-white rounded-lg',className)}>
        <div className={`flex-1 ${centerText?'justify-center': 'text-left'} flex items-center`}>
            {linkText}
        </div>
        {childrenIcon}
    </Link>
  )
}
