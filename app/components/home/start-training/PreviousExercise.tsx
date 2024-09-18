import { fetchPreviousExercise } from '@/app/actions'
import { ExerciseType, Series } from '@/app/types'
import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { SmallLoader } from '../../Loading/SmallLoader'
import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ModalContexts } from './ModalContexts'

type PreviousExerciseTypes = {
    exerciseid: string,
}

export const PreviousExercise = ({exerciseid}:PreviousExerciseTypes) => {
    const modalsContext = useContext(ModalContexts)
    const[data,setData] = useState<ExerciseType|null>()
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
        if(modalsContext?.prevExerciseId === exerciseid){
            setData(modalsContext?.prevExercise)
            return
        } 
        const func = async () => {
            setLoading(true)
            await fetchData()
            setLoading(false)
        }
        func()
        modalsContext?.setPrevExerciseId(exerciseid)
    },[exerciseid])

    const close = () => {
        modalsContext?.setShowPreviousExercise(false)
    }
    const fetchData = async () => { 
        const result = await fetchPreviousExercise(exerciseid)
        if(result) setData(result)
        modalsContext?.setPrevExercise(result)
    }
  return (
    <div className='fixed flex-col left-0 top-0 pt-20  right-0 w-screen z-20 backdrop-blur-sm flex bottom-20 text-white px-5'>
        {loading?<SmallLoader/>:
        !data?<div className='fixed flex-col left-0 top-0 pt-20 pb-20 right-0 w-screen z-20 backdrop-blur-sm flex bottom-20 text-white px-5 text-center text-2xl gap-4 justify-center'>
            Nie ma historii tego ćwiczenia
            <button className='w-full bg-red text-xl py-2 rounded-xl mb-4' onClick={close}>Zamknij</button>
        </div>:
        <div>
            <button className='w-full bg-red text-xl py-2 rounded-xl mb-4' onClick={close}>Zamknij</button>
            <div className='flex mb-4'>
                <div className='text-2xl text-left'>{data?.exercisename}</div>
                <div className='flex gap-1 ml-auto'>
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