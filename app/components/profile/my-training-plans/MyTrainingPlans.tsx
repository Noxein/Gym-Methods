'use client'
import { UserTrainingPlan } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import React, { useContext, useState } from 'react'
import { UserTrainingPlans } from './UserTrainings'
import { AddTrainingModal } from './AddTrainingModal'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteTrainingModal } from './DeleteTrainingModal'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'

type MyTrainingPlansTypes = {
    UserTrainings: UserTrainingPlan[],
    showAddModalUrl: boolean,
}
export const MyTrainingPlans = ({UserTrainings,showAddModalUrl}:MyTrainingPlansTypes) => {
  const[showAddModal,setShowAddModal] = useState(showAddModalUrl)
  const[showDeleteModal,setShowDeleteModal] = useState(false)
  const[currentSelectedTraining,setCurrentSelectedTrainign] = useState<UserTrainingPlan|null>()
  const theme = useContext(ThemeContext)

  const HandleShowAddModal = () => {
    setShowAddModal(true)
    HideShowHTMLScrollbar('hide')
  }
  return (
    <div className={`mx-5 text-${theme?.colorPallete.accent} mt-10`}>
        <h1 className='text-center text-2xl text-white'>Moje Plany Treningowe</h1>
        <button onClick={HandleShowAddModal} className='flex justify-between w-full text-xl px-4 py-4 bg-green  rounded-lg mt-5 text-white'>Dodaj nowy trening <PlusIcon /></button>

        <UserTrainingPlans UserTrainings={UserTrainings} setShowDeleteModal={setShowDeleteModal} setCurrentSelectedTrainign={setCurrentSelectedTrainign}/>
        {showAddModal && <AddTrainingModal setShowAddModal={setShowAddModal} trainingCount={UserTrainings.length}/>}
        {showDeleteModal && <DeleteTrainingModal setShowDeleteModal={setShowDeleteModal} currentSelectedTraining={currentSelectedTraining}/>}
    </div>
  )
}
