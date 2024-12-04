import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { UserTrainingPlan } from '@/app/types'
import { TrashIcon } from '@/app/ui/icons/ExpandIcon'
import Link from 'next/link'
import { useContext } from 'react'

type Training = {
    UserTraining: UserTrainingPlan,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSelectedTrainign: React.Dispatch<React.SetStateAction<UserTrainingPlan | null | undefined>>,
}
export const Training = ({UserTraining,setShowDeleteModal,setCurrentSelectedTrainign}:Training) => {
    const DeleteTraining = () => {
      setCurrentSelectedTrainign(UserTraining)
      HideShowHTMLScrollbar('hide')
      setShowDeleteModal(true)
    }
  return (
    <div className={`text-xl rounded-lg flex items-center bg-borderInteractive`}>
      <Link href={`/home/profile/my-training-plans/${UserTraining.trainingname}`} className='flex flex-1 items-center rounded-lg p-[2px]'>
        <div className={`bg-dark py-3 rounded-lg flex-1 px-4`}>
          {UserTraining.trainingname}
        </div>
      </Link>
      
      <Icon onClick={DeleteTraining}>
        <TrashIcon fill='#fff'/>
      </Icon>
    </div>
  )
}

const Icon = ({children,sClass,...rest}:{children:React.ReactNode,sClass?:string}&React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    
    return (
    <div className={`flex justify-center items-center bg-[dark] rounded-md my-1 ${sClass} cursor-pointer h-full px-1`} {...rest}>
      {children}
    </div>
    )
  }