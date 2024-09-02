import { getTrainingInProgressData } from '@/app/actions'
import React from 'react'
import { TrainingInProcessModal } from './TrainingInProcessModal'

type TrainingInProcessTypes = {
  trainingName:string
}
export const TrainingInProcess = async ({trainingName}:TrainingInProcessTypes) => {
    const trainingInProgressData = await getTrainingInProgressData()

  return (
    <TrainingInProcessModal trainingInProgressData={trainingInProgressData} currentTrainingNeed={trainingName}/>
  )
}
