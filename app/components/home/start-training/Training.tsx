import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { TrainingExerciseType, UserTrainingPlan } from '@/app/types'
import { auth } from '@/auth'
import { ModalContextsProvider } from './ModalContexts'

type TrainingTypes = {
    trainingName: string,
    training?: UserTrainingPlan,
    lastid: number,
    trainingid:string,
    exercisesLeft?: TrainingExerciseType[] | undefined
}
export const Training = async ({trainingName,training,lastid,trainingid,exercisesLeft}:TrainingTypes) => {
    const user = await auth()
    const showTempo = !!user?.user?.showTempo
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    return(
        <main>
            <ModalContextsProvider>
                <DisplayTraining 
                    trainingName={trainingName} 
                    training={exercisesLeft?exercisesLeft:training?.exercises.exercises} 
                    trainingPlanId={training?.id!} 
                    showTempo={showTempo} 
                    lastid={lastid} 
                    trainingid={trainingid} 
                    exercises={exercises}
                    allExercisesInOneArray={allExercisesInOneArray}
                    allHandles={allHandles}
                    ExercisesThatRequireHandle={ExercisesThatRequireHandle}
                    ExercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure}
                    />
            </ModalContextsProvider>
        </main>
    )
}
