import { AllExercisesInOneArray, getAllExercises, GetUserTrainingByName } from '@/app/actions'
import { LoadingTrainingPlanSkeleton } from '@/app/components/Loading/my-training-plans/LoadingTrainingPlanSkeleton'
import { ErrorTrainingQuery } from '@/app/components/profile/my-training-plans/trainingPlanName/ErrorTrainingQuery'
import { SpecificTraining } from '@/app/components/profile/my-training-plans/trainingPlanName/SpecificTraining'
import { SpecificTrainingDontExist } from '@/app/components/profile/my-training-plans/trainingPlanName/SpecificTrainingDontExist'
import React, { Suspense } from 'react'

export default async function page({params}:{params:{trainingPlanName:string}}){
  const trainingName = decodeURI(params.trainingPlanName)
  const training = await GetUserTrainingByName(trainingName)
  const isError = training?.error
  const exercises = await getAllExercises()
  const allExercisesInOneArray = await AllExercisesInOneArray()
  
return (
  <div>
      {!training?<SpecificTrainingDontExist trainingName={trainingName}/>
      :isError?<ErrorTrainingQuery error={isError}/>
      :<SpecificTraining training={training.training!} exercises={exercises} allExercisesInOneArray={allExercisesInOneArray}/>}
  </div>
)
}
