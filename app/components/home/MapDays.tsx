'use client'
import { dayArrayInitializer } from '@/app/lib/utils'
import { isSameDay } from 'date-fns'
import { useState } from 'react'
import { ProgessionsDeclinesType } from '@/app/types'
import { useTranslations } from 'use-intl'
import { Progressions } from './Progressions'
import { Progressions2 } from './Progressions2'
import DaysWidget from './DaysWidget'

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
    <DaysWidget />
    { swtich ? <Progressions data={data} setSwtich={setSwtich}/> : 
    <Progressions2 setSwtich={setSwtich} bestExercise={bestExercise} worstExercise={worstExercise}/>}
    </>)
}

