'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { ConvertEnglishWeekDayToPolish, GetMonth } from '@/app/lib/utils'
import { LastExerciseType } from '@/app/types'
import { format, subHours } from 'date-fns'
import React, { useContext } from 'react'
import { WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'

type LastTrainingItemTypes = {
    lastExercise: LastExerciseType
}
export const LastTrainingItem = ({lastExercise}:LastTrainingItemTypes) => {
    const theme = useContext(ThemeContext)
    const offset = new Date(lastExercise.datetime).getTimezoneOffset()/60
    const finishHour = subHours(new Date(lastExercise.datetime),offset)
    const weekday = ConvertEnglishWeekDayToPolish(lastExercise.weekday)
    
  return (
    <div className={`bg-${theme?.colorPallete.accent} py-[1px] px-[1px] rounded-md flex`}>
        <div className={`bg-${theme?.colorPallete.primary} flex rounded-md flex-1 px-4 pb-4 pt-2 justify-between items-center`}>
            <div className='flex flex-col relative'>
                <span>{lastExercise.trainingname}</span>
                <span className='text-gray-400 text-sm relative'>
                    <span className='absolute -top-2'>{weekday}</span>
                </span>
            </div>
            
            <div className='flex gap-4 items-center mt-2'>
                <span>{format(finishHour,'dd.LL.yyyy')}</span>
                <span>{format(finishHour,'H:mm')} </span>
            </div>
        </div>

    </div>
  )
}
