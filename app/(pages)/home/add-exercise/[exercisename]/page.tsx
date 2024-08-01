import React from 'react'
import { exercisesArr } from '@/app/lib/exercise-list'
import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { AddExercise } from '@/app/components/AddExercise'
import { auth } from '@/auth'

export default async function page({params}:{params:{exercisename:string}}){
  const exerciseName = decodeURI(params.exercisename)
  const isExerciseInTheList = exercisesArr.includes(exerciseName)
  const user = await auth()

  if(!isExerciseInTheList) return <ExerciseNotFound />
  return (
    <div>
      <AddExercise name={exerciseName} showTempo={user?.user?.showTempo}/>
    </div>
  )
}
