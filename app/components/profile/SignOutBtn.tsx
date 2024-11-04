'use client'
import { logout } from '@/app/actions'
import { ThemeContext } from '@/app/context/ThemeContext'
import { useContext } from 'react'
import { Icon } from '../Icon'

type SignOutBtnTypes = {
  children: React.ReactNode
}

export const SignOutBtn = ({children}:SignOutBtnTypes) => {
  const theme = useContext(ThemeContext)
  return (
    <button onClick={async(e)=>{ await logout()}} className={`w-full mb-24 bg-${theme?.colorPallete.accent} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.secondary} p-[1px] text-center rounded-lg text-xl flex items-center`}>
            <span className={`bg-${theme?.colorPallete.primary} flex-1 py-3 rounded-lg`}>
              Wyloguj
            </span>
            <Icon className="px-1 flex items-center">
              {children}
            </Icon>
        </button>
  )
}