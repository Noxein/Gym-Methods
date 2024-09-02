import { ThemeContext } from '@/app/context/ThemeContext'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { UserTrainingPlan } from '@/app/types'
import { PencilIcon, RightTriangle, TrashIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import React, { useContext } from 'react'

type Training = {
    UserTraining: UserTrainingPlan,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSelectedTrainign: React.Dispatch<React.SetStateAction<UserTrainingPlan | null | undefined>>,
}
export const Training = ({UserTraining,setShowDeleteModal,setCurrentSelectedTrainign}:Training) => {
    const theme = useContext(ThemeContext)
    const DeleteTraining = () => {
      setCurrentSelectedTrainign(UserTraining)
      HideShowHTMLScrollbar('hide')
      setShowDeleteModal(true)
    }
  return (
    <div className={`text-xl rounded-lg flex items-center bg-${theme?.colorPallete.accent}`}>
      <Link href={`/home/profile/my-training-plans/${UserTraining.trainingname}`} className='flex flex-1 items-center rounded-lg p-[1px]'>
        <div className={`bg-${theme?.colorPallete.primary} py-3 rounded-lg flex-1 px-4`}>
          {UserTraining.trainingname}
        </div>
      </Link>
      
      <Icon onClick={DeleteTraining}>
        <TrashIcon fill='#0D1317'/>
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