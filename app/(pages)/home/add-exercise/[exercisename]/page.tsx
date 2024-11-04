import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { ArrayOfAllExercises, getAllHandleTypes, getUserExerciseIdUsingName, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { AddExerciseStateProvider } from '@/app/components/add-exercise/AddExerciseStateProvider'
import { Metadata } from 'next'
import { exercisesArr } from '@/app/lib/exercise-list'

export const metadata: Metadata = {
  title: "Dodaj ćwiczenie",
};

export default async function page({params}:{params:{exercisename:string}}){
  const exerciseName = decodeURI(params.exercisename)
  const allExercises = await ArrayOfAllExercises()
  const isExerciseInTheList = allExercises.includes(exerciseName)
  const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
  const allHandles = await getAllHandleTypes()

  let exerciseid = exerciseName
  if(!exercisesArr.includes(exerciseName)){
    exerciseid = await getUserExerciseIdUsingName(exerciseName)
  }
  const showTimeMesure = ExercisesThatRequireTimeMesure.some(exercise => exercise.exercisename === exerciseName)
  const requiresHandle = ExercisesThatRequireHandle.some(exercise => exercise.exercisename === exerciseName)

  if(!isExerciseInTheList) return <ExerciseNotFound />
  return (
    <div>
      <AddExerciseStateProvider name={exerciseName} exerciseid={exerciseid} showTimeMesure={showTimeMesure} requiresHandle={requiresHandle} allHandles={allHandles}/>
    </div>
  )
}
