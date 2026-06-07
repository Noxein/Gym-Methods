import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { ArrayOfAllExercises, getAllHandleTypes, getUserExerciseIdUsingName, getUserExerciseProgression, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { AddExerciseStateProvider } from '@/app/components/add-exercise/AddExerciseStateProvider'
import { exercisesArr } from '@/app/lib/exercise-list'
import { MetaDataTranslations } from '@/app/lib/utils'
import { auth } from '@/auth'

export async function generateMetadata() {
  const t = await MetaDataTranslations()
 
  return {
    title: t('Add exercise')
  };
}



export default async function page(props:{params: Promise<{exercisename:string}>}) {
  const params = await props.params;

  let shouldContinue = false

  const exerciseName = decodeURIComponent(params.exercisename)
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
