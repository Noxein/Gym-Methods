import { getExistingTraining } from '@/app/actions'
import { UserTrainingPlan } from '@/app/types'
import React from 'react'
import { Training } from './Training'

type ContinueTrainingTypes = {
    name: string,
    training?: UserTrainingPlan,
}

export const ContinueTraining = async ({name,training}:ContinueTrainingTypes) => {
    const loadPlan = await getExistingTraining()
    const lastid = training?.exercises.exercises.findIndex(x=>x.exerciseid===loadPlan?.lastexerciseid)! + 1 | 0
    console.log(loadPlan,training,lastid)
  return (
    <Training name={name} training={training} lastid={lastid} trainingid={loadPlan?.id!}/>
    //<div>{name}</div>
  )
}
