import { PlusIcon, ProfileIcon, SettingsIcon, StartWorkoutIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import React from 'react'

export const BottomMenu = () => {
  return (
    <nav className='flex fixed bottom-0 z-20 w-screen bg-blue-500 py-6 border-t-blue-400 border-2'>
        <MenuBtn hrefTo={'/home/profile'}>
            <ProfileIcon />
        </MenuBtn>

        <MenuBtn hrefTo={'/home/add-exercise'}>
            <PlusIcon />
        </MenuBtn>

        <MenuBtn hrefTo={'/home/start-training'}>
            <StartWorkoutIcon />
        </MenuBtn>

        <MenuBtn hrefTo={'/home/settings'}>
            <SettingsIcon />
        </MenuBtn>
    </nav>
  )
}

const MenuBtn = ({hrefTo,children}:{hrefTo:string,children:React.ReactNode}) => {
    return(
        <Link href={hrefTo} className='flex-1 flex justify-center'>
            {children}
        </Link>
    )
}