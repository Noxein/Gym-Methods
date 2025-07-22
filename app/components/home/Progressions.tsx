import { compareBetterSeries, nameTrimmer } from '@/app/lib/utils';
import { ExerciseTypeWithHandle, HistoryExercise, ProgessionsDeclinesType, Series } from '@/app/types';
import { ArrowIcon, CrossIcon, LockIcon, SwapIcon } from '@/app/ui/icons/ExpandIcon';
import React, { useState } from 'react'
import { Icon } from '../Icon';
import { BlurBackgroundModal } from '../BlurBackgroundModal';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { exercisesArr } from '@/app/lib/exercise-list';

type ProgressionsTypes = {
  data?: {
      [key: string]: ProgessionsDeclinesType[];
  },
  setSwtich: React.Dispatch<React.SetStateAction<boolean>>
}

export const Progressions = ({data,setSwtich}:ProgressionsTypes) => {
  const[showModal,setShowModal] = useState(false)
  const[selectedExerciseId,setSelectedExerciseId] = useState('')
  return (
    <div className='mx-5 mt-5 px-2'>
      <div className='flex justify-center' onClick={()=>setSwtich(x=>!x)}>
        <h2 className='text-white text-center mb-2 text-xl'>Progresje</h2>
        <Icon >
          <SwapIcon fill='#3C9F65'/>
        </Icon>
      </div>
      <div className='flex flex-col gap-2'>
        {data && Object.keys(data).map((key,index)=>(
          index < 5 && <SingleProgression obj={data[key]} key={index} setShowModal={setShowModal} setSelectedExerciseId={setSelectedExerciseId}/>
        ))}
      </div>
      {showModal && <BlurBackgroundModal onClick={()=>setShowModal(false)}>
        <SelectedExerciseDisplay exercise={data![selectedExerciseId]} setShowModal={setShowModal}/>
      </BlurBackgroundModal>}
    </div>
  )
}

type SelectedExerciseDisplayTypes = {
  exercise: ProgessionsDeclinesType[],
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const SelectedExerciseDisplay = ({exercise,setShowModal}:SelectedExerciseDisplayTypes) => {

  const d = useTranslations("DefaultExercises")
  const formattedName = exercisesArr.includes(exercise[0].exercisename) ? d(nameTrimmer(exercise[0].exercisename)) : exercise[0].exercisename

  return(
        <div onClick={e=>e.stopPropagation()} className='text-white w-full mx-5'>
          <div className='flex justify-between mb-4 text-xl'>
            <p>{formattedName}</p>
            <button onClick={()=>setShowModal(false)}>
              <CrossIcon fill='#9F443C' />
            </button>
          </div>
          {exercise.map((x,i)=>(<SingleExercise day={x.date} exercise={x} key={i}/>))}
        </div>
  )
}
type SingleProgressionType = {
  obj: ProgessionsDeclinesType[],
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedExerciseId: React.Dispatch<React.SetStateAction<string>>,
}

const SingleProgression = ({obj,setShowModal,setSelectedExerciseId}:SingleProgressionType) => {

  const betterSeries = compareBetterSeries(obj[0].sets,obj[1].sets)

  const handleClick = () => {
    setShowModal(true)
    setSelectedExerciseId(obj[0].exerciseid)
  }
  return(
    obj[0] && <div className={`${betterSeries.value==='series1'?'':''} text-neutral-300 flex justify-between bg-darkLight p-2 rounded-lg`} onClick={handleClick}>
      <p>{obj[0].exercisename}</p>
      <Icon className={`${betterSeries.value==='series1'?'':'scale-y-[-1]'}`}>
        <ArrowIcon fill={betterSeries.value==='series1'?'#3C9F65':'#9F443C'} />
      </Icon>
    </div>
  )
}

type SingleExerciseTypes = {
    exercise: ProgessionsDeclinesType,
    day: Date
}

const SingleExercise = ({day,exercise}:SingleExerciseTypes) => {
    const u = useTranslations("Utils")
    const weeIndex = format(day,'i') 
    const monthIndex = format(day,'L')
    return(
        <div className='flex flex-col h-fit'>
            <div className='sticky flex gap-1 top-[60px] h-fit bg-green font-bold text-black px-2'>
                <span>{u("WeekFullName",{day: weeIndex})}</span>
                <span>{format(day,'dd')}</span>
                <span>{u("MonthIndex",{index: monthIndex})}</span>
                <span className='ml-auto'>{format(day,'yyyy')}</span>
            </div>
            <div className='flex flex-col my-1'>
                
              <ExercisesMap exercise={exercise.sets} name={exercise.exercisename}/>
                
            </div>
        </div>
    )
}

type ExercisesMapType = {
    exercise: Series[],
    name: string
}

const ExercisesMap = ({exercise,name}:ExercisesMapType) => {
    
    return (
        <div className='bg-darkLight my-1 rounded-lg'>
            <div className='pb-2 pt-1 px-2 flex flex-col gap-1'>
                {exercise.map((set,index)=>(
                    <SingleSet set={set} key={index}/>
                ))}
            </div>
        </div>
    )
}
type SingleSetType = {
    set: Series
}
const SingleSet = ({set}:SingleSetType) => {

    const u = useTranslations("Utils")

    return(
        <div className='flex pr-2'>
            <SpanElement additionalText={u(set.side)}/>
            <SpanElement text={set.weight} additionalText='kg'/>
            {
            set.time?<SpanElement text={set.time} additionalText={u("Time")}/>:
            <SpanElement text={set.repeat} additionalText={'x'}/>
            }
            <SpanElement additionalText={set.difficulty && u(set.difficulty.charAt(0).toUpperCase() + set.difficulty.slice(1))}/>
        </div>
    )
}

const SpanElement = ({text,additionalText}:{text?:string|number,additionalText?:string}) => {
    return(
        <span className='flex-1 text-right pr-2'>
            <span className='font-semibold'>{text}</span> <span className='font-normal'>{additionalText}</span>
        </span>
    )
} 