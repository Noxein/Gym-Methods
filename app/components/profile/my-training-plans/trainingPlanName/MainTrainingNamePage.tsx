import { checkTrainingInProgress } from '@/app/actions'
import { TrainingInProcess } from '@/app/components/home/start-training/TrainingInProcess'
import React from 'react'

type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
}

export const page = async ({params,searchParams}:Pagetypes) => {
    const decodedTrainingName = decodeURI(params.trainingName)
    const isAnyTrainingInProgress = await checkTrainingInProgress()
    const shouldLoadFromMemory = searchParams.inProgress

    if(isAnyTrainingInProgress){ 
        // there user can either select to end training that is in progress, or continue training that is in progress
        // if user decides to close, then database is updated and user is once again redirected to this page, and query is sent again but this time 
        // variable isAnyTrainingInProgress is false so we skip this step

        // if user decides to continue training that is in progress then we send user to /start-trainig/training-name?inProgress=true
        //and in this file we also catch if training is in porgress, and if it is then we load state from localstorage
        return <TrainingInProcess trainingName={decodedTrainingName}/>
    }

  return (
    <div>

    </div>
  )
}
