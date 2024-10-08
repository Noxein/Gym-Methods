import { checkIfTrainingIsInProgress } from '@/app/actions'
import { MyTraingPlansPage } from '@/app/components/profile/my-training-plans/trainingPlanName/MyTraingPlansPage'
import { TrainingInProgressModal } from '@/app/components/profile/my-training-plans/trainingPlanName/TrainingInProgressModal'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Edytuj trening",
};

export default async function page({params}:{params:{trainingPlanName:string}}){
  const trainingName = decodeURI(params.trainingPlanName)
  const isThisTrainingInProgress = await checkIfTrainingIsInProgress(trainingName)

  if(isThisTrainingInProgress) {
    return <TrainingInProgressModal trainingName={trainingName}/>
  }

return <MyTraingPlansPage trainingName={trainingName}/>
}
