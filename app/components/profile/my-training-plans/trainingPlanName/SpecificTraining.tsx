'use client'
import { ThemeContext } from '@/app/context/ThemeContext'
import { HideShowHTMLScrollbar, WeekDayArray, WeekDayArrayPL } from '@/app/lib/utils'
import { ExerciseTypes, TrainingExerciseType, UserExercise, UserTrainingPlan, WeekDay } from '@/app/types'
import React, { useContext, useState } from 'react'
import { MapExercises } from './MapExercises'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ListedAddedExercises } from './ListedAddedExercises'
import { EditUserTraining } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { LoaderFullScreen } from '@/app/components/Loading/LoaderFullScreen'

type SpecificTrainingType = {
    training: UserTrainingPlan,
    exercises: ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
}
export const SpecificTraining = ({training,exercises,allExercisesInOneArray}:SpecificTrainingType) => {
  const theme = useContext(ThemeContext)
  const router = useRouter()
  const[planName,setPlanName] = useState(training.trainingname)
  const[planWeekDay,setPlanWeekDay] = useState<WeekDay>(training.weekday)
  const[planExercises,setPlanExercises] = useState<TrainingExerciseType[]>(training.exercises.exercises)
  const[showAddExercise,setShowAddExercise] = useState(false)
  const[error,setError] = useState('')
  const[isLoading,setIsLoading] = useState(false)

  const addExercise = () => {
    setShowAddExercise(true)
    HideShowHTMLScrollbar('hide')
  }

  const handleSave = async () => {
    setIsLoading(true)
    const isError = await EditUserTraining(training.id,planName,planExercises,planWeekDay)
    if(isError && isError.error){
      setIsLoading(false)
      return setError(isError.error)
    } 
  }
  if(isLoading) return <LoaderFullScreen />
  return (
    <div className='flex flex-col mx-5 min-h-[calc(100dvh-40px)]'>
      <div className='flex flex-col gap-2 mt-5'>
        <input type="text" value={planName} onChange={e=>setPlanName(e.target.value)} className={`w-full bg-${theme?.colorPallete.primary} text-${theme?.colorPallete.accent} border-${theme?.colorPallete.accent} border-2 rounded-md py-3 px-2`} placeholder='Nazwa treningu'/>
        <Select handleChange={setPlanWeekDay} value={WeekDayArrayPL[WeekDayArray.indexOf(planWeekDay)]}/>
      </div>
      {error && <div className='text-red-500'>{error}</div>}

      <div className='mt-10 min-h-[calc(100dvh-180px)]'>
        <button onClick={addExercise}
          className={`text-left px-2 pr-4 w-full bg-green text-${theme?.colorPallete.accent} rounded-md py-3 flex justify-between`}
        >Dodaj nowe ćwiczenie <PlusIcon width='20'/> </button>

        {planExercises && <ListedAddedExercises planExercises={planExercises} setPlanExercises={setPlanExercises}/>}

        <div className='bottom-24 fixed flex right-5 left-5 gap-4'>
          <button className={`flex-1 bg-green text-${theme?.colorPallete.accent} py-3 rounded-md`} onClick={handleSave}>Zapisz zmiany</button>
          <button className={`flex-1 bg-red text-${theme?.colorPallete.accent} rounded-md`} onClick={()=>router.push('/home/profile/my-training-plans')}>Anuluj</button>
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
    <select name="Dzień tygodnia" value={value} onChange={e=>handleChange(WeekDayArray[WeekDayArrayPL.indexOf(e.target.value)] as WeekDay)} className={`text-${theme?.colorPallete.accent} rounded-md border-2 border-${theme?.colorPallete.accent} bg-${theme?.colorPallete.primary} px-2 py-3 `}>
        {WeekDayArrayPL.map(day=>(
            <option value={day} key={day}>{day}</option>
        ))}
    </select>
  )
}