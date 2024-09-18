import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, ExercisesThatRequireTimeMesure, getAllExercises } from '@/app/actions'
import { TrainingExerciseType, UserTrainingPlan } from '@/app/types'
import { auth } from '@/auth'
import { ModalContextsProvider } from './ModalContexts'

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
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    return(
        <main>
            <ModalContextsProvider>
                <DisplayTraining 
                    trainingName={name} 
                    training={exercisesLeft?exercisesLeft:training?.exercises.exercises} 
                    trainingPlanId={training?.id!} 
                    showTempo={showTempo} 
                    exercisesThatRequireTimeMesure={exercisesThatRequireTimeMesure} 
                    lastid={lastid} 
                    trainingid={trainingid} 
                    exercises={exercises}
                    allExercisesInOneArray={allExercisesInOneArray}
                    />
            </ModalContextsProvider>
        </main>
    )
}
