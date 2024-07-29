import React from 'react'
import { exercisesArr } from '@/app/lib/exercise-list'
import { ExerciseNotFound } from '@/app/components/add-exercise/ExerciseNotFound'
import { AddExercise } from '@/app/components/AddExercise'

export default function page({params}:{params:{exercisename:string}}){
  const exerciseName = decodeURI(params.exercisename)
  const isExerciseInTheList = exercisesArr.includes(exerciseName)


  if(!isExerciseInTheList) return <ExerciseNotFound />
  return (
    <div className='mt-20'>
      <AddExercise name={exerciseName} />
    </div>
  )
}
