import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { TrainingExerciseType, UserTrainingPlan } from '@/app/types'
import { ModalContextsProvider } from './ModalContexts'

type TrainingTypes = {
    trainingName: string,
    training?: UserTrainingPlan,
    lastid: number,
    trainingid:string,
    exercisesLeft?: TrainingExerciseType[] | undefined
}
export const Training = async ({trainingName,training,lastid,trainingid,exercisesLeft}:TrainingTypes) => {
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
