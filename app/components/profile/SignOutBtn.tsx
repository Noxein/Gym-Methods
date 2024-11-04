'use client'
import { logout } from '@/app/actions'
import { Icon } from '../Icon'

type SignOutBtnTypes = {
  children: React.ReactNode
}

export const SignOutBtn = ({children}:SignOutBtnTypes) => {
  return (
    <button onClick={async(e)=>{ await logout()}} className={`w-full mb-24 bg-marmur text-marmur border-marmury} p-[1px] text-center rounded-lg text-xl flex items-center`}>
            <span className={`bg-dark flex-1 py-3 rounded-lg`}>
              Wyloguj
            </span>
            <Icon className="px-1 flex items-center">
              {children}
            </Icon>
        </button>
  )
}