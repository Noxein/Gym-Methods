import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userEmail, userExercisesThatRequireHandlesOrTimeMesure, userID } from '@/app/actions'
import { SholudAddWeightType, UserTrainingPlan } from '@/app/types'
import { ModalContextsProvider } from './ModalContexts'

type TrainingTypes = {
    trainingPlanData?: UserTrainingPlan,
}
export const Training = async ({trainingPlanData}:TrainingTypes) => {
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
    const exercisesObject = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    const useremail = await userEmail()
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
                    useremail={useremail}
                    />
            </ModalContextsProvider>
        </main>
    )
}
