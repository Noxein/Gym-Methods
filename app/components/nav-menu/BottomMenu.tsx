'use client'
import { HomeIcon, PlusIcon, ProfileIcon, StartWorkoutIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'

export const BottomMenu = () => {
  return (
    <nav className={`flex fixed bottom-0 z-20 w-screen bg-[#131C22] py-6 border-t-white border-t-2`}>
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

const MenuBtn = ({hrefTo,children}:{hrefTo:string,children:React.ReactNode}) => {
    return(
        <Link href={hrefTo} className='flex-1 flex justify-center'>
            {children}
        </Link>
    )
}