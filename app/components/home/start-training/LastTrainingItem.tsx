'use client'
import { ConvertEnglishWeekDayToPolish } from '@/app/lib/utils'
import { LastExerciseType, SubPlanStarter } from '@/app/types'
import { format, subHours } from 'date-fns'
import { useTranslations } from 'next-intl'

type LastTrainingItemTypes = {
    lastExercise: SubPlanStarter
}
export const LastTrainingItem = ({lastExercise}:LastTrainingItemTypes) => {
    const finishHour = new Date(lastExercise.date!)

    const u = useTranslations("Utils")
    const weekday = u("WeekDayEnglish",{day: format(lastExercise.date!,'EEEE')})
    
  return (
    <div className={`rounded-md flex`}>
        <div className={`bg-darkLight flex rounded-md flex-1 px-4 pb-4 pt-2 justify-between items-center`}>
            <div className='flex flex-col relative'>
                <span>{lastExercise.name}</span>
                <span className='text-gray-400 text-sm relative'>
                    <span className='absolute -top-2'>{weekday}</span>
                </span>
            </div>
            
            <div className='flex gap-4 items-center mt-2 font-mono'>
                <span>{format(finishHour,'dd.LL.yyyy')}</span>
                <span>{format(finishHour,'H:mm')} </span>
            </div>
        </div>

    </div>
  )
}
