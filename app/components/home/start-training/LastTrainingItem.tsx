'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { GetMonth } from '@/app/lib/utils'
import { LastExerciseType } from '@/app/types'
import { format, subHours } from 'date-fns'
import React, { useContext } from 'react'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

type LastTrainingItemTypes = {
    lastExercise: LastExerciseType
}
export const LastTrainingItem = ({lastExercise}:LastTrainingItemTypes) => {
    const theme = useContext(ThemeContext)
    const offset = new Date(lastExercise.datetime).getTimezoneOffset()/60
    const finishHour = subHours(new Date(lastExercise.datetime),offset)
  return (
    <div className={`bg-${theme?.colorPallete.accent} py-[1px] px-[1px] rounded-md flex`}>
        <div className={`bg-${theme?.colorPallete.primary} flex rounded-md flex-1 px-4 pb-4 pt-2 justify-between items-center`}>
            <div className='flex flex-col relative'>
                <span>{lastExercise.trainingname}</span>
                <span className='text-gray-400 text-sm relative'>
                    <span className='absolute -top-2'>{lastExercise.weekday}</span>
                </span>
            </div>
            
            <div className='flex gap-4 items-center mt-2'>
                <span>{lastExercise.datetime.getDate()}.{GetMonth(lastExercise.datetime)}.{lastExercise.datetime.getFullYear()}</span>
                <span>{format(finishHour,'H:m')} </span>
            </div>
        </div>

    </div>
  )
}
