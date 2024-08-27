'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { UserTrainingPlan } from '@/app/types'
import { LeftAngle, RightTriangle } from '@/app/ui/icons/ExpandIcon'
import React, { useContext } from 'react'
import { Icon } from '../../Icon'

type TrainingLinkTypes = {
    plan: UserTrainingPlan
}
export const TrainingLink = ({plan}:TrainingLinkTypes) => {
    const theme = useContext(ThemeContext)
  return (
    <div className={`bg-${theme?.colorPallete.accent} py-[1px] pl-[1px] rounded-md flex`}>
        <div className={`bg-${theme?.colorPallete.primary} flex flex-col rounded-md flex-1 px-4 pb-5 pt-3 relative`}>
            <span>{plan.trainingname}</span>
            <span className='text-gray-400 text-sm relative'>
                <span className='absolute -top-2'>{plan.weekday}</span>
            </span>
        </div>
        <div className='flex items-center px-2'>
            <Icon className='flex justify-center items-center'>
                <RightTriangle width='15px' height='30px'/>
            </Icon>
        </div>    
    </div>
  )
}
