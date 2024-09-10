import Link from 'next/link'
import React, { useContext } from 'react'
import { TrainingLink } from './TrainingLink'
import { userTrainingsList } from '@/app/actions'

type TrainingListTypes = {
}
export const TrainingList = async ({}:TrainingListTypes) => {
  const trainingList = await userTrainingsList()
  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>
        {trainingList && trainingList.map(x=>(
            <Link href={`/home/start-training/${x.trainingname}`} key={x.id}>
              <TrainingLink plan={x}/>
            </Link>
        ))}
    </div>
  )
}
