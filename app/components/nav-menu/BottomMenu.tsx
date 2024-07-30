'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { PlusIcon, ProfileIcon, SettingsIcon, StartWorkoutIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import React, { useContext } from 'react'

export const BottomMenu = () => {
    const theme = useContext(ThemeContext)
  return (
    <nav className={`flex fixed bottom-0 z-20 w-screen bg-[${theme?.colorPallete.secondary}] py-6 border-t-blue-400 border-2`}>
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