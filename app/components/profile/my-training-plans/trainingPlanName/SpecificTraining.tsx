'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ExerciceTypes, TrainingExerciseType, UserExercise, UserTraining, WeekDay } from '@/app/types'
import React, { useContext, useRef, useState } from 'react'
import { MapExercises } from './MapExercises'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ListedAddedExercises } from './ListedAddedExercises'
import { EditUserTraining } from '@/app/actions'
import { useRouter } from 'next/navigation'

type SpecificTrainingType = {
    training: UserTraining,
    exercises: ExerciceTypes,
    allExercisesInOneArray: (string | UserExercise)[],
}
export const SpecificTraining = ({training,exercises,allExercisesInOneArray}:SpecificTrainingType) => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const[planName,setPlanName] = useState(training.trainingname)
  const[planWeekDay,setPlanWeekDay] = useState<WeekDay>(training.weekday)
  const[planExercises,setPlanExercises] = useState<TrainingExerciseType[]>([])
  const[showAddExercise,setShowAddExercise] = useState(false)
  const[error,setError] = useState('')

  const addExercise = () => {
    setShowAddExercise(true)
  }

  const handleSave = async () => {
    let idArr: string[] = []
    planExercises.forEach(plan=>idArr.push(plan.exerciseid))
    console.log(idArr)
    const isError = await EditUserTraining(training.id,planName,idArr,planWeekDay)
    if(isError && isError.error) setError(isError.error)
  }
  return (
    <div className='mx-5 mb-20'>
      <div className='flex flex-col gap-2 mt-5'>
        <input type="text" value={planName} onChange={e=>setPlanName(e.target.value)} className={`w-full bg-[${theme?.colorPallete.primary}] text-[${theme?.colorPallete.accent}] border-${theme?.colorPallete.accent} border-2 rounded-md py-3 px-2`} placeholder='Nazwa treningu'/>
        <Select handleChange={setPlanWeekDay} value={planWeekDay[0]}/>
      </div>
      {error && <div className='text-red-500'>{error}</div>}

      <div className='mt-10'>
        <button onClick={addExercise}
          className={`text-left px-2 pr-4 w-full bg-green-600 text-[${theme?.colorPallete.accent}] rounded-md py-3 flex justify-between`}
        >Dodaj nowe ćwiczenie <PlusIcon width='20'/> </button>

        <ListedAddedExercises planExercises={planExercises} setPlanExercises={setPlanExercises}/>

      <div className='flex gap-4 mt-5'>
        <button className={`flex-1 bg-green-500 text-[${theme?.colorPallete.accent}] py-3 rounded-md`} onClick={handleSave}>Zapisz zmiany</button>
        <button className={`flex-1 bg-red-500 text-[${theme?.colorPallete.accent}] rounded-md`} onClick={()=>router.push('/home/profile/my-training-plans')}>Anuluj</button>
      </div>

      </div>

      {showAddExercise && <MapExercises exercises={exercises} allExercisesInOneArray={allExercisesInOneArray} setPlanExercises={setPlanExercises} setShowAddExercise={setShowAddExercise}/>}
    </div>
  )
}

type SelectTypes = {
  value:string,
  handleChange: React.Dispatch<React.SetStateAction<WeekDay>>
}

const Select = ({value,handleChange}:SelectTypes) => {
  const theme = useContext(ThemeContext)
  return(
    <select name="Dzień tygodnia" value={value} onChange={e=>handleChange(e.target.value as WeekDay)} className={`text-[${theme?.colorPallete.accent}] rounded-md border-2 border-[${theme?.colorPallete.accent}] bg-[${theme?.colorPallete.primary}] px-2 py-3 `}>
        {WeekDayArrayPL.map(day=>(
            <option value={day} key={day}>{day}</option>
        ))}
    </select>
  )
}