import { fetchPreviousExercise } from '@/app/actions'
import { ExerciseType, Series } from '@/app/types'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { SmallLoader } from '../../Loading/SmallLoader'
import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { useTranslations } from 'next-intl'

type PreviousExerciseTypes = {
    exerciseid: string,
    historyCache: {[key: string]: ExerciseType | null} | undefined,
    setHistoryCache: React.Dispatch<React.SetStateAction<{
        [key: string]: ExerciseType | null
    } | undefined>>
}

export const PreviousExercise = ({exerciseid,historyCache,setHistoryCache}:PreviousExerciseTypes) => {
    const[data,setData] = useState<ExerciseType|null>()
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
        const func = async () => {
            setData(null)
            setLoading(true)
            await fetchData()
            setLoading(false)
        }
        func()
    },[exerciseid])

    const fetchData = async () => {
        if((historyCache && historyCache[exerciseid] === null) || (historyCache && historyCache[exerciseid])){
            return setData(historyCache[exerciseid])
        }
        const result = await fetchPreviousExercise(exerciseid)


        setHistoryCache(x=>{
            let xCopy = {...x}
            xCopy[exerciseid] = result
            return xCopy
        })
        setData(result)
        
    }
    const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
    const u = useTranslations("Utils")
    console.log(data)
  return (
    <div className='text-white'>
        {loading?<SmallLoader/>:
        !data?<div className=''>
            {t("NoHistory")}
        </div>:
        <div>
            <div className='flex mb-4'>
                <div className='flex gap-1'>
                    <span className='ml-auto'>{u("WeekFullName",{day: format(data?.date!,'i')})}</span>
                    <span>{format(data?.date!,'dd')}</span>
                    <span>{u("MonthIndex",{index: format(data?.date||1,'M')})}</span>
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

    const u = useTranslations("Utils")
    return(
        <div className={`grid grid-cols-4 text-right bg-dark pr-4 border-1 py-2 rounded-xl`}>
            <span>{set.side && u(set.side)}</span>
            <span><b>{(set.weight && set.weight !== 0) && set.weight}</b> kg</span>
            <span><b>{(set.time || set.repeat) &&  set.time?set.time:set.repeat}</b> {set.time && set.time?null:'x'}</span>
            <span>{set.difficulty && u(set.difficulty.charAt(0).toUpperCase() + set.difficulty.slice(1))}</span>
        </div>
    )
}