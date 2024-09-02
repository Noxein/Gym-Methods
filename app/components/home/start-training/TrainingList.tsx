import { ThemeContext } from '@/app/context/ThemeContext'
import { UserTrainingPlan } from '@/app/types'
import Link from 'next/link'
import React, { useContext } from 'react'
import { TrainingLink } from './TrainingLink'
import { userTrainingsList } from '@/app/actions'

type TrainingListTypes = {
}
export const TrainingList = async ({}:TrainingListTypes) => {
  const trainingList = await userTrainingsList()
  const filteredList = trainingList.filter(x=>Object.keys(x.exercises).length>0)
  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>
        {filteredList && filteredList.map(x=>(
            <Link href={`/home/start-training/${x.trainingname}`} key={x.id}>
              <TrainingLink plan={x}/>
            </Link>
        ))}
    </div>
  )
}
