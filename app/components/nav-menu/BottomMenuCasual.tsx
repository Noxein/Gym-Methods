'use client'
import { HomeIcon, PlusIcon, ProfileIcon, StartWorkoutIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import { MenuBtn } from './MenuBtn'

export const BottomMenuCasual = () => {
  return (
    <nav className={`flex fixed bottom-0 z-40 max-w-mobile w-full mx-auto bg-menubar py-6 border-t-white `}>
        <MenuBtn hrefTo={'/home'}>
            <HomeIcon />
        </MenuBtn>

        <MenuBtn hrefTo={'/home/start-training'}>
            <StartWorkoutIcon fill='#D9D9D9'/>
        </MenuBtn>

        <MenuBtn hrefTo={'/home/add-exercise'}>
            <PlusIcon fill='#D9D9D9'/>
        </MenuBtn>

        <MenuBtn hrefTo={'/home/profile'}>
            <ProfileIcon fill='#D9D9D9'/>
        </MenuBtn>
    </nav>
  )
}

