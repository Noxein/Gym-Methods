import { ThemeContext } from '@/app/context/ThemeContext'
import { UserTraining } from '@/app/types'
import { PencilIcon, TrashIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import React, { useContext } from 'react'

type Training = {
    UserTraining: UserTraining,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSelectedTrainign: React.Dispatch<React.SetStateAction<UserTraining | null | undefined>>,
}
export const Training = ({UserTraining,setShowDeleteModal,setCurrentSelectedTrainign}:Training) => {
    const theme = useContext(ThemeContext)
    const DeleteTraining = () => {
      setCurrentSelectedTrainign(UserTraining)
      setShowDeleteModal(true)
    }
  return (
    <div className={`text-xl px-5 py-4 border-2 border-[${theme?.colorPallete.accent}] rounded-lg flex gap-2 items-center`}>
        <Link href={`/home/profile/my-training-plans/${UserTraining.trainingname}`} className={`flex-1`}>
            {UserTraining.trainingname}
        </Link>
        <Link href={`/home/profile/my-training-plans/${UserTraining.trainingname}`}>
            <Icon>
                <PencilIcon />
            </Icon>
        </Link>
        <Icon onClick={DeleteTraining}>
            <TrashIcon />
        </Icon>
        
        
    </div>

  )
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const theme = useContext(ThemeContext)
    
    return (
    <div className={`flex justify-center items-center bg-[${theme?.colorPallete.primary}] rounded-md my-1 ${sClass} cursor-pointer h-full px-1`} {...rest}>
      {children}
    </div>
    )
  }