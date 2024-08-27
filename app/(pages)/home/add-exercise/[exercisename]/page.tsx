import React from 'react'
import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { AddExercise } from '@/app/components/add-exercise/AddExercise'
import { auth } from '@/auth'
import { ArrayOfAllExercises, ExercisesThatRequireTimeMesure } from '@/app/actions'
import { AddExerciseStateProvider } from '@/app/components/add-exercise/AddExerciseStateProvider'

export default async function page({params}:{params:{exercisename:string}}){
  const exerciseName = decodeURI(params.exercisename)
  const allExercises = await ArrayOfAllExercises()
  const isExerciseInTheList = allExercises.includes(exerciseName)
  const exercisesThatRequireTimeMesure = await ExercisesThatRequireTimeMesure()
  
  const showTimeMesure = exercisesThatRequireTimeMesure.includes(exerciseName)
  const user = await auth() 

  if(!isExerciseInTheList) return <ExerciseNotFound />
  return (
    <div>
      <AddExerciseStateProvider name={exerciseName} showTempo={!!user?.user?.showTempo} showTimeMesure={showTimeMesure}/>
    </div>
  )
}
