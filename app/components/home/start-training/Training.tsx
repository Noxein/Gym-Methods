import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { ExercisesThatRequireTimeMesure } from '@/app/actions'
import { TrainingExerciseType, UserTrainingPlan } from '@/app/types'
import { auth } from '@/auth'

type TrainingTypes = {
    name: string,
    training?: UserTrainingPlan,
    lastid: number,
    trainingid:string,
    exercisesLeft?: TrainingExerciseType[] | undefined
}
export const Training = async ({name,training,lastid,trainingid,exercisesLeft}:TrainingTypes) => {
    const user = await auth()
    const showTempo = !!user?.user?.showTempo
    const exercisesThatRequireTimeMesure = await ExercisesThatRequireTimeMesure()
    return(
        <main>
            <DisplayTraining trainingName={name} training={exercisesLeft?exercisesLeft:training?.exercises.exercises} trainingPlanId={training?.id!} showTempo={showTempo} exercisesThatRequireTimeMesure={exercisesThatRequireTimeMesure} lastid={lastid} trainingid={trainingid}/>
        </main>
    )
}
