import { ThemeContext } from '@/app/context/ThemeContext'
import { UserTrainingPlan } from '@/app/types'
import Link from 'next/link'
import React, { useContext } from 'react'
import { TrainingLink } from './TrainingLink'

type TrainingListTypes = {
    list: UserTrainingPlan[]
}
export const TrainingList = ({list}:TrainingListTypes) => {
  return (
    <div className='flex flex-col mx-5 mt-2 gap-2'>
        {list && list.map(x=>(
            <Link href={`/home/start-training/${x.trainingname}`} key={x.id}>
              <TrainingLink plan={x}/>
            </Link>
        ))}
    </div>
  )
}
