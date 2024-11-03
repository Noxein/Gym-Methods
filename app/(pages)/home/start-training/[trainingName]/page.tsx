import { getTrainingDataByName } from '@/app/actions'
import { Training } from '@/app/components/home/start-training/Training'
import { TrainingInProcess } from '@/app/components/home/start-training/TrainingInProcess'
import React from 'react'

type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
}

export default async function page({params,searchParams}:Pagetypes){
    const decodedTrainingName = decodeURI(params.trainingName)
    const trainingData = await getTrainingDataByName(decodedTrainingName)

  return (
        trainingData.data && <Training trainingPlanData={trainingData.data}/>
  )
}
