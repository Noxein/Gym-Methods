'use client'
import React, { useState } from 'react'
import { Icon } from '../../Icon'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { useTranslations } from 'next-intl'
import { BlurBackgroundModal } from '../../BlurBackgroundModal'
import StartNewTrainingList from './StartNewTrainingList'
import { BigTrainingData } from '@/app/types'
import { ButtonWithIcon } from '../../ui/ButtonWithIcon'

type AddTrainingLinkTypes = {
  LongTermTrainingList: BigTrainingData[]
}
export const AddTrainingLink = ({LongTermTrainingList}:AddTrainingLinkTypes) => {

    const t = useTranslations("Home/Start-Training")
    const[showTrainingList,setShowTrainingList] = useState(false)
    
    const flip = () => {
      setShowTrainingList(!showTrainingList)
    }

  return (
  <>
    <ButtonWithIcon 
      isPrimary
      className='mx-5 text-xl'
      buttonText={t("StartNewTraining")}

      childrenIcon={
        <Icon className='bg-opacity-0'>
          <PlusIcon />
        </Icon>}

      onClick={flip}
      />

    {showTrainingList && 
      <BlurBackgroundModal onClick={flip}>
        <StartNewTrainingList LongTermTrainingList={LongTermTrainingList} flip={flip}/>
      </BlurBackgroundModal>}
  </>
  )
}
