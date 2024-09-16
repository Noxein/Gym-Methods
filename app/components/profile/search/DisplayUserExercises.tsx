import { ThemeContext } from '@/app/context/ThemeContext'
import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ExerciseType, HistoryExercise, Series } from '@/app/types'
import { format } from 'date-fns'
import React, { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SmallLoader } from '../../Loading/SmallLoader'

type DisplayUserExercisesTypes = {
    fetchedExercises: HistoryExercise[],
    manyExercises:boolean,
    handleSearch: () => void,
    dataLength: number,
    totalItems: number,
}
export const DisplayUserExercises = ({fetchedExercises,manyExercises,handleSearch,dataLength,totalItems}:DisplayUserExercisesTypes) => {
    console.log(fetchedExercises)
  return (
   
    <div className='mt-16 mx-5 mb-20'>
         <InfiniteScroll
         dataLength={dataLength}
         hasMore={!(totalItems===dataLength)}
         loader={<SmallLoader />} 
         next={()=>handleSearch()}
         endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>To już wszystkie ćwiczenia</b>
            </p>
          }
          style={{overflow:''}}
         >
            {fetchedExercises.map((exercise,index)=>(
                <SingleExercise exercise={exercise} key={index}/>
            ))}
        </InfiniteScroll>
    </div>
  )
}

type SingleExerciseTypes = {
    exercise: HistoryExercise,
}
const SingleExercise = ({exercise}:SingleExerciseTypes) => {
    const theme = useContext(ThemeContext)
    return(
        <div className='flex flex-col h-fit'>
            <div className='sticky flex gap-1 top-8 h-fit bg-marmur text-black px-2'>
                <span>{WeekDayArrayPL[WeekDayArray.indexOf(format(exercise.exercises[0].date,'cccc'))]}</span>
                <span>{format(exercise.exercises[0].date,'dd')}</span>
                <span>{MonthNamesArrayPL[MonthNamesArray.indexOf(format(exercise.exercises[0].date,'LLLL'))]}</span>
            </div>
            <div className='flex flex-col'>
                {exercise.exercises.map(exercise=>(
                    <ExercisesMap exercise={exercise} key={exercise.id}/>
                ))}
            </div>
        </div>
    )
}

type ExercisesMapType = {
    exercise: ExerciseType,
}

const ExercisesMap = ({exercise}:ExercisesMapType) => {
    return (
        <div>
            <div className={`bg-green text-marmur flex justify-between px-2 font-bold`}> 
            <span>
                {exercise.exercisename}
            </span>
        </div>

        <div className='py-4 pl-4 grid grid-cols-[2fr_5fr]'>
            <div>
                
            </div>
            <div>
                {exercise.sets.map((set,index)=>(
                    <SingleSet set={set} key={index}/>
                ))}
            </div>
        </div>
    </div>
    )
}
type SingleSetType = {
    set: Series
}
const SingleSet = ({set}:SingleSetType) => {
    return(
        <div className='flex pr-2'>
            <SpanElement text={set.weight} additionalText='kg'/>
            {
            set.time?<SpanElement text={set.time} additionalText='czas'/>:
            <SpanElement text={set.repeat} additionalText={set.repeat===0?'serii':set.repeat===1?'seria':set.repeat>=5?'serii':set.repeat>=2?'serie':'seria'}/>
            }
            <SpanElement additionalText={DifficultyArrayPL[DifficultyArray.indexOf(set.difficulty)]}/>
        </div>
    )
}

const SpanElement = ({text,additionalText}:{text?:string|number,additionalText?:string}) => {
    return(
        <span className='flex-1 text-right pr-2'>
            <b>{text}</b> {additionalText}
        </span>
    )
} 