import { closeTraining, getTrainingInProgressData } from '@/app/actions'
import React from 'react'
import { TrainingInProcessModal } from './TrainingInProcessModal'

type TrainingInProcessTypes = {
  trainingName:string
}
export const TrainingInProcess = async ({trainingName}:TrainingInProcessTypes) => {
  console.log('NAME OF TRAINING "TrainingInProcess" COMPONENT',trainingName)
    const trainingInProgressData = await getTrainingInProgressData()

  return (
    <TrainingInProcessModal trainingInProgressData={trainingInProgressData} currentTrainingNeed={trainingName}/>
  )
}
