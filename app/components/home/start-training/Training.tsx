import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userEmail, userExercisesThatRequireHandlesOrTimeMesure, userID } from '@/app/actions'
import { Progression, SholudAddWeightType, UserTrainingPlan } from '@/app/types'
import { ModalContextsProvider } from './ModalContexts'
import { TimerContextProvider } from '@/app/context/TimerContext'

type TrainingTypes = {
    trainingPlanData?: UserTrainingPlan,
    progressions: Progression[]
}
export const Training = async ({trainingPlanData,progressions}:TrainingTypes) => {
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
    const exercisesObject = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    const useremail = await userEmail()
    return(
        <main>
            <ModalContextsProvider>
                <TimerContextProvider>
                    <DisplayTraining 
                        trainingPlanData={trainingPlanData!}
                        exercisesObject={exercisesObject}
                        allExercisesInOneArray={allExercisesInOneArray}
                        allHandles={allHandles}
                        ExercisesThatRequireHandle={ExercisesThatRequireHandle}
                        ExercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure}
                        useremail={useremail}
                        progressions={progressions}
                        />
                    </TimerContextProvider>
            </ModalContextsProvider>
        </main>
    )
}
