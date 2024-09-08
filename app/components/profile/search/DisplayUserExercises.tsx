import { ThemeContext } from '@/app/context/ThemeContext'
import { DifficultyArray, DifficultyArrayPL, MonthNamesArray, MonthNamesArrayPL, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ExerciseType, Series } from '@/app/types'
import { format } from 'date-fns'
import React, { useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SmallLoader } from '../../Loading/SmallLoader'

type DisplayUserExercisesTypes = {
    fetchedExercises: ExerciseType[],
    manyExercises:boolean,
    handleSearch: () => void,
    dataLength: number,
    totalItems: number,
}
export const DisplayUserExercises = ({fetchedExercises,manyExercises,handleSearch,dataLength,totalItems}:DisplayUserExercisesTypes) => {
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
         >
            {fetchedExercises.map(exercise=>(
                <SingleExercise exercise={exercise} manyExercises={manyExercises} key={exercise.id}/>
            ))}
        </InfiniteScroll>
    </div>
  )
}

type SingleExerciseTypes = {
    exercise: ExerciseType,
    manyExercises:boolean,
}
const SingleExercise = ({exercise,manyExercises}:SingleExerciseTypes) => {
    const theme = useContext(ThemeContext)
    return(
        <div>
            <div className={`bg-green text-${theme?.colorPallete.primary} flex justify-between px-2 font-bold`}> 
                <span className='flex gap-1'>
                    <span>{WeekDayArrayPL[WeekDayArray.indexOf(format(exercise.date,'cccc'))]}</span>
                    <span>{MonthNamesArrayPL[MonthNamesArray.indexOf(format(exercise.date,'LLLL'))]}</span>
                    <span>{format(exercise.date,'dd')}</span>
                </span>
                <span>
                    {format(exercise.date,'yyyy')} 
                </span>
            </div>

            <div className='py-4 pl-4 grid grid-cols-[2fr_5fr]'>
                <div>
                    {manyExercises?<span>{exercise.exercisename}</span>:null}
                </div>
                <div>
                    {exercise.sets.sets.map((set,index)=>(
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
            set.time?<SpanElement text={set.time}/>:
            <SpanElement text={set.repeat} additionalText={set.repeat>=5?'serii':set.repeat>=2?'serie':'seria'}/>
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