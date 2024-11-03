import React from 'react'
import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userExercisesThatRequireHandlesOrTimeMesure } from '@/app/actions'
import { TrainingExerciseType, UserTrainingPlan } from '@/app/types'
import { ModalContextsProvider } from './ModalContexts'

type TrainingTypes = {
    trainingPlanData?: UserTrainingPlan,
}
export const Training = async ({trainingPlanData}:TrainingTypes) => {
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
    const exercisesObject = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    return(
        <main>
            <ModalContextsProvider>
                <DisplayTraining 
                    trainingPlanData={trainingPlanData!}
                    exercisesObject={exercisesObject}
                    allExercisesInOneArray={allExercisesInOneArray}
                    allHandles={allHandles}
                    ExercisesThatRequireHandle={ExercisesThatRequireHandle}
                    ExercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure}
                    />
            </ModalContextsProvider>
        </main>
    )
}
