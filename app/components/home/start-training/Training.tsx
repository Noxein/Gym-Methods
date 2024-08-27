import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { ExercisesThatRequireTimeMesure } from '@/app/actions'
import { UserTrainingPlan } from '@/app/types'
import { auth } from '@/auth'

type TrainingTypes = {
    name: string,
    training?: UserTrainingPlan,
    lastid: number,
    trainingid:string,
}
export const Training = async ({name,training,lastid,trainingid}:TrainingTypes) => {
    const user = await auth()
    const showTempo = !!user?.user?.showTempo
    const exercisesThatRequireTimeMesure = await ExercisesThatRequireTimeMesure()
    console.log(training)
    return(
        <main>
            <DisplayTraining trainingName={name} training={training?.exercises.exercises} trainingPlanId={training?.id!} showTempo={showTempo} exercisesThatRequireTimeMesure={exercisesThatRequireTimeMesure} lastid={lastid} trainingid={trainingid}/>
        </main>
    )
}
