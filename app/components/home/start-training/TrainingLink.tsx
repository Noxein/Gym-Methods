'use client'
import { UserTrainingPlan } from '@/app/types'
import { RightTriangle } from '@/app/ui/icons/ExpandIcon'
import { Icon } from '../../Icon'
import { ConvertEnglishWeekDayToPolish } from '@/app/lib/utils'

type TrainingLinkTypes = {
    plan: UserTrainingPlan
}
export const TrainingLink = ({plan}:TrainingLinkTypes) => {
    const weekday = ConvertEnglishWeekDayToPolish(plan.weekday)
  return (
    <div className={`bg-marmur py-[1px] pl-[1px] rounded-md flex`}>
        <div className={`bg-dark flex flex-col rounded-md flex-1 px-4 pb-5 pt-3 relative`}>
            <span>{plan.trainingname}</span>
            <span className='text-gray-400 text-sm relative'>
                <span className='absolute -top-2'>{weekday}</span>
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
