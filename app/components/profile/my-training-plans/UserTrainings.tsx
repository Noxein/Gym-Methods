import { UserTrainingPlan as U } from '@/app/types'
import React from 'react'
import { Training } from './Training'

type UserTrainingPlansTypes = {
    UserTrainings: U[],
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentSelectedTrainign: React.Dispatch<React.SetStateAction<U | null | undefined>>,
}
export const UserTrainingPlans = ({UserTrainings,setShowDeleteModal,setCurrentSelectedTrainign}:UserTrainingPlansTypes) => {
  return (
    <div className='flex flex-col gap-4 mt-5'>
        {UserTrainings.map(training=>(
            <Training UserTraining={training} key={training.id} setShowDeleteModal={setShowDeleteModal} setCurrentSelectedTrainign={setCurrentSelectedTrainign}/>
        ))}
    </div>
  )
}