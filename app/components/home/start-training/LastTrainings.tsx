import { getLastTrainigs } from '@/app/actions'
import React from 'react'
import { LastTrainingItem } from './LastTrainingItem'

export const LastTrainings = async () => {
    const trainings = await getLastTrainigs(2) 
    console.log('TRAININGS',trainings)
  return (
    <div className='flex flex-col gap-2 mx-5'>
        {trainings && trainings.map((training,index)=>(
            <LastTrainingItem lastExercise={training} key={index}/>
        ))}
    </div>
  )
}
