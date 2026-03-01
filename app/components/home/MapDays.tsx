'use client'
import { dayArrayInitializer } from '@/app/lib/utils'
import { isSameDay } from 'date-fns'
import { useState } from 'react'
import { ProgessionsDeclinesType } from '@/app/types'
import { useTranslations } from 'use-intl'
import { Progressions } from './Progressions'
import { Progressions2 } from './Progressions2'

type MapDaysTypes = {
    data?: {
        [key: string]: ProgessionsDeclinesType[];
    },
    bestExercise?: {
        exercise: ProgessionsDeclinesType[];
        score: number;
    },
    worstExercise?: {
        exercise: ProgessionsDeclinesType[];
        score: number;
    }
}

export const MapDays = ({data,bestExercise,worstExercise}:MapDaysTypes) => {
    const days = dayArrayInitializer()
    const [swtich,setSwtich] = useState(true)

    const u = useTranslations("Utils")

  return (<>
    <div className={`bg-marmur w-screen flex justify-evenly py-2 min-h-16`}>
        {days.map((day,i)=>(
            <div key={day.getDate()} className={`leading-3 w-12 h-12 pb-1 flex flex-col items-center justify-center ${isSameDay(day,new Date())?`bg-dark text-marmur`:null} rounded-full`} 
            >

                <span className='text-xl font-bold'>{u("WeekFirstLetter",{WeekIndex: i})}</span>
            
                {day.getDate()}
            </div>
        ))}
    </div>
    { swtich ? <Progressions data={data} setSwtich={setSwtich}/> : 
    <Progressions2 setSwtich={setSwtich} bestExercise={bestExercise} worstExercise={worstExercise}/>}
    </>)
}

