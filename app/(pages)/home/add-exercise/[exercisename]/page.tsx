import React from 'react'
import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { auth } from '@/auth'
import { ArrayOfAllExercises, ExercisesThatRequireTimeMesure, getUserExerciseIdUsingName } from '@/app/actions'
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
  const exercisesThatRequireTimeMesure = await ExercisesThatRequireTimeMesure()
  let exerciseid = exerciseName
  if(!exercisesArr.includes(exerciseName)){
    exerciseid = await getUserExerciseIdUsingName(exerciseName)
  }
  const showTimeMesure = exercisesThatRequireTimeMesure.includes(exerciseName)
  const user = await auth() 

  if(!isExerciseInTheList) return <ExerciseNotFound />
  return (
    <div>
      <AddExerciseStateProvider name={exerciseName} exerciseid={exerciseid} showTempo={!!user?.user?.showTempo} showTimeMesure={showTimeMesure}/>
    </div>
  )
}
