import { getTrainingDataByName } from '@/app/actions'
import { Training } from '@/app/components/home/start-training/Training'
import { TrainingError } from '@/app/components/home/start-training/TrainingError'
import { Button } from '@/app/components/ui/Button'
import Link from 'next/link'
import React from 'react'

type Pagetypes = {
    params:{trainingName:string}
    searchParams: { inProgress: string }
}

export default async function page({params,searchParams}:Pagetypes){
    const decodedTrainingName = decodeURI(params.trainingName)
    const trainingData = await getTrainingDataByName(decodedTrainingName)

    if(trainingData.error){
      return (
      <TrainingError message={trainingData.error}>
        <Button className='px-4 flex-1'>
          <Link href={'/home/start-training'}>Powrót</Link>
        </Button>
      </TrainingError>
      )
    }
  return (
        trainingData.data && <Training trainingPlanData={trainingData.data}/>
  )
}
