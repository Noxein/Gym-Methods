'use client'
import { HideShowHTMLScrollbar, WeekDayArray } from '@/app/lib/utils'
import { ExerciseTypes, TrainingProgression, UserExercise, UserTrainingPlan, WeekDay } from '@/app/types'
import { useState } from 'react'
import { MapExercises } from './MapExercises'
import { PlusIcon } from '@/app/ui/icons/ExpandIcon'
import { ListedAddedExercises } from './ListedAddedExercises'
import { EditUserTraining } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { LoaderFullScreen } from '@/app/components/Loading/LoaderFullScreen'
import { ButtonWithIcon } from '@/app/components/ui/ButtonWithIcon'
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
import { Select } from '@/app/components/ui/SelectField'
import { ErrorDiv } from '@/app/components/ui/ErrorDiv'
import { useTranslations } from 'next-intl'

type SpecificTrainingType = {
    training: UserTrainingPlan,
    exercises: ExerciseTypes,
    allExercisesInOneArray: (string | UserExercise)[],
}
export const SpecificTraining = ({training,exercises,allExercisesInOneArray}:SpecificTrainingType) => {
  const router = useRouter()
  const[planName,setPlanName] = useState(training.trainingname)
  const[planWeekDay,setPlanWeekDay] = useState<WeekDay>(training.weekday)
  const[planExercises,setPlanExercises] = useState<TrainingProgression[]>(training.exercises)
  const[showAddExercise,setShowAddExercise] = useState(false)
  const[error,setError] = useState('')
  const[loading,setLoading] = useState(false)
  
  const addExercise = () => {
    setShowAddExercise(true)
    HideShowHTMLScrollbar('hide')
  }

  const handleSave = async () => {
    setLoading(true)
    const isError = await EditUserTraining(training.id,planName,planExercises,planWeekDay)
    if(isError && isError.error){
      setLoading(false)
      return setError(e(isError.error))
    } 
  }

  const t = useTranslations("Home/Profile/My-Training-Plans/[TrainingPlanName]")
  const u = useTranslations("Utils")
  const e = useTranslations("Errors")
  
  if(loading) return <LoaderFullScreen />
  return (
    <div className='flex flex-col mx-5 min-h-[calc(100dvh-40px)]'>
      <div className='flex flex-col gap-4 mt-5 text-marmur text-xl'>
        <Input labelName={u("TrainingName")} type="text" value={planName} onChange={e=>setPlanName(e.target.value)} />
        <Select labelName={u("DayOfWeek")} valuesToLoop={WeekDayArray} value={planWeekDay} onChange={e=>setPlanWeekDay(e.target.value as WeekDay)} />

      </div>

      <ErrorDiv error={error}/>

      <div className='mt-10 min-h-[calc(100dvh-180px)]'>
        <ButtonWithIcon
        onClick={addExercise}
        buttonText={t("AddNewExercise")}
        childrenIcon={
          <PlusIcon width='20' fill='#D9D9D9'/>
        }
        isPrimary
        className='bg-green w-full'
        disabled={loading}
        />

        {planExercises && <ListedAddedExercises planExercises={planExercises} setPlanExercises={setPlanExercises}/>}

        <div className='bottom-24 text-white fixed flex right-5 left-5 gap-4'>

          <Button className='flex-1' onClick={()=>router.push('/home/profile/my-training-plans')} disabled={loading}>{u("Cancel")}</Button>
          <Button className='flex-1' isPrimary onClick={handleSave} disabled={loading}>{u("SaveChanges")}</Button>
          
        </div>

      </div>

      {showAddExercise && <MapExercises exercisesObject={exercises} allExercisesInOneArray={allExercisesInOneArray} setPlanExercises={setPlanExercises} setShowAddExercise={setShowAddExercise}/>}
    </div>
  )
}