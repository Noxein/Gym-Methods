'use client'
import { UserTraining } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import React, { useContext, useState } from 'react'
import { UserTrainingPlans } from './UserTrainings'
import { AddTrainingModal } from './AddTrainingModal'
import { ThemeContext } from '@/app/context/ThemeContext'
import { DeleteTrainingModal } from './DeleteTrainingModal'

type MyTrainingPlansTypes = {
    UserTrainings: UserTraining[]
}
export const MyTrainingPlans = ({UserTrainings}:MyTrainingPlansTypes) => {
  const[showAddModal,setShowAddModal] = useState(false)
  const[showDeleteModal,setShowDeleteModal] = useState(false)
  const[currentSelectedTraining,setCurrentSelectedTrainign] = useState<UserTraining|null>()
  const theme = useContext(ThemeContext)
  return (
    <div className={`mx-6 text-[${theme?.colorPallete.accent}] mt-20`}>
        <h1 className='text-center text-2xl'>Moje Plany Treningowe</h1>
        <button onClick={()=>setShowAddModal(!showAddModal)} className='flex justify-between w-full text-xl px-4 py-4 bg-green-600 rounded-lg mt-5'>Dodaj nowy trening <PlusIcon /></button>

        <UserTrainingPlans UserTrainings={UserTrainings} setShowDeleteModal={setShowDeleteModal} setCurrentSelectedTrainign={setCurrentSelectedTrainign}/>
        {showAddModal && <AddTrainingModal setShowAddModal={setShowAddModal}/>}
        {showDeleteModal && <DeleteTrainingModal setShowDeleteModal={setShowDeleteModal} currentSelectedTraining={currentSelectedTraining}/>}
    </div>
  )
}
