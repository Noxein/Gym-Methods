'use client'
import { UserTrainingPlan } from '@/app/types'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { useState } from 'react'
import { UserTrainingPlans } from './UserTrainings'
import { AddTrainingModal } from './AddTrainingModal'
import { DeleteTrainingModal } from './DeleteTrainingModal'
import { HideShowHTMLScrollbar } from '@/app/lib/utils'
import { ButtonWithIcon } from '../../ui/ButtonWithIcon'
import { Icon } from '../../Icon'
import { useTranslations } from 'next-intl'

type MyTrainingPlansTypes = {
    UserTrainings: UserTrainingPlan[],
    showAddModalUrl: boolean,
}
export const MyTrainingPlans = ({UserTrainings,showAddModalUrl}:MyTrainingPlansTypes) => {
  const[showAddModal,setShowAddModal] = useState(showAddModalUrl)
  const[showDeleteModal,setShowDeleteModal] = useState(false)
  const[currentSelectedTraining,setCurrentSelectedTrainign] = useState<UserTrainingPlan|null>()
  
  const HandleShowAddModal = () => {
    setShowAddModal(true)
    HideShowHTMLScrollbar('hide')
  }
  const t = useTranslations("Home/Profile/My-Training-Plans")
  return (
    <div className={`mx-5 text-marmur mt-10`}>
        <h1 className='text-center text-2xl text-white'>{t("MyTrainingPlans")}</h1>
        <ButtonWithIcon 
        buttonText={t("AddNewTraining")}
        childrenIcon={
          <Icon>
            <PlusIcon />
          </Icon>
        }
        className='bg-green w-full text-xl mt-4 items-center flex'
        isPrimary
        onClick={HandleShowAddModal}
        />

        <UserTrainingPlans UserTrainings={UserTrainings} setShowDeleteModal={setShowDeleteModal} setCurrentSelectedTrainign={setCurrentSelectedTrainign}/>
        
        {showAddModal && <AddTrainingModal setShowAddModal={setShowAddModal} trainingCount={UserTrainings.length}/>}
        {showDeleteModal && <DeleteTrainingModal setShowDeleteModal={setShowDeleteModal} currentSelectedTraining={currentSelectedTraining}/>}
    </div>
  )
}
