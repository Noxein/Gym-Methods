import { AllExercisesInOneArray, checkIfTrainingIsInProgress, getAllExercises, GetUserTrainingByName } from '@/app/actions'
import { MyTraingPlansPage } from '@/app/components/profile/my-training-plans/trainingPlanName/MyTraingPlansPage'
import { TrainingInProgressModal } from '@/app/components/profile/my-training-plans/trainingPlanName/TrainingInProgressModal'
import React from 'react'

export default async function page({params}:{params:{trainingPlanName:string}}){
  const trainingName = decodeURI(params.trainingPlanName)
  const isThisTrainingInProgress = await checkIfTrainingIsInProgress(trainingName)
  const training = await GetUserTrainingByName(trainingName)
  const isError = training?.error
  const exercises = await getAllExercises()
  const allExercisesInOneArray = await AllExercisesInOneArray()

  if(isThisTrainingInProgress) {
    return <TrainingInProgressModal trainingName={trainingName}/>
  }

return <MyTraingPlansPage trainingName={trainingName}/>
}
