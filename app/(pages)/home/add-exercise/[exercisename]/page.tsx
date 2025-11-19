import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { ArrayOfAllExercises, getAllHandleTypes, getUserExerciseIdUsingName, getUserExerciseProgression, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { AddExerciseStateProvider } from '@/app/components/add-exercise/AddExerciseStateProvider'
import { exercisesArr } from '@/app/lib/exercise-list'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = getLocale()
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('Add exercise')
  };
}



export default async function page({params}:{params:{exercisename:string}}){
  let shouldContinue = false
  
  const exerciseName = decodeURI(params.exercisename)
  const isDefaultExercise = exercisesArr.includes(exerciseName)
  if(isDefaultExercise){
    if(exercisesArr.includes(exerciseName)) shouldContinue = true
  }else{
      const allExercises = await ArrayOfAllExercises()
      const isExerciseInTheList = allExercises.includes(exerciseName)
      if(isExerciseInTheList) shouldContinue = true
  }

  if(!shouldContinue) return <ExerciseNotFound />

  return (

      <AddExerciseStateProvider name={exerciseName}/>

  )
}
