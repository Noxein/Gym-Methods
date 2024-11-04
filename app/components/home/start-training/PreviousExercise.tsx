import { fetchPreviousExercise } from '@/app/actions'
import { ExerciseType, Series } from '@/app/types'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { SmallLoader } from '../../Loading/SmallLoader'
import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'

type PreviousExerciseTypes = {
    exerciseid: string,
}

export const PreviousExercise = ({exerciseid}:PreviousExerciseTypes) => {
    const[data,setData] = useState<ExerciseType|null>()
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
        const func = async () => {
            setLoading(true)
            await fetchData()
            setLoading(false)
        }
        func()
    },[exerciseid])

    const fetchData = async () => { 
        const result = await fetchPreviousExercise(exerciseid)
        if(result) setData(result)
    }

  return (
    <div className='text-white'>
        {loading?<SmallLoader/>:
        !data?<div className=''>
            Nie ma historii tego ćwiczenia
        </div>:
        <div>
            <div className='flex mb-4'>
                <div className='flex gap-1'>
                    <span className='ml-auto'>{WeekDayArrayPL[WeekDayArray.indexOf(format(data?.date!,'cccc'))]}</span>
                    <span>{format(data?.date!,'dd')}</span>
                    <span>{MonthNamesArrayPL[MonthNamesArray.indexOf(format(data?.date!,'LLLL'))]}</span>
                </div>
            </div>
    
            <div className='flex flex-col gap-2'>
                {data?.sets.map((set,index)=>(
                    <Set set={set} key={index} odd={index%2===0}/>
                ))}
            </div>
        </div>
    }
    </div>
  )
}

type SetTypes = {
    set: Series,
    odd: boolean,
}

const Set = ({set,odd}:SetTypes) => {
    const EngArr = ['Both','Left','Right']
    const PlArr = ['Obie','Lewa','Prawa']

    const translatedText = PlArr[EngArr.indexOf(set.side)]
    const difficulty = DifficultyArrayPL[DifficultyArray.indexOf(set.difficulty)]
    return(
        <div className={`grid grid-cols-4 text-right bg-dark pr-4 border-1 py-2 rounded-xl`}>
            <span>{translatedText}</span>
            <span><b>{set.weight}</b> kg</span>
            <span title={` ${set.repeat} powtórzeń`}><b>{set.time?set.time:set.repeat}</b> {set.time?null:'x'}</span>
            <span>{difficulty}</span>
        </div>
    )
}