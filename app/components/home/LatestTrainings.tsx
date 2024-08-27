import { getTwoLatestTrainings } from '@/app/actions'
import React from 'react'
import { CompletedTraining } from './CompletedTraining'
import { GymExercisesDbResult } from '@/app/types'

export const LatestTrainings = async () => {
    const trainings = await getTwoLatestTrainings()
    console.log('TRAININGS',trainings)
  return (
    <div className='mx-5'>
      <h2 className='text-marmur text-2xl text-center mt-6'>Ostatnie treningi</h2>
      <div className='flex flex-wrap gap-4 mt-3'>
        {trainings.newArr?.map((training,index)=>(
          <CompletedTraining training={training} trainingDate={trainings.trainingNames[index].datetime} trainingName={trainings.trainingNames[index].trainingname} key={index}/>
        ))}
      </div>
    </div>
  )
}
