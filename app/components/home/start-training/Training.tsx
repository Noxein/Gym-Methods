import { DisplayTraining } from './DisplayTraining'
import { AllExercisesInOneArray, getAllExercises, getAllHandleTypes, userEmail, userExercisesThatRequireHandlesOrTimeMesure, userID } from '@/app/actions'
import { BigTrainingStarter, Progression, SholudAddWeightType, UserTrainingPlan } from '@/app/types'
import { ModalContextsProvider } from './ModalContexts'
import { TimerContextProvider } from '@/app/context/TimerContext'
import { LongPlanContextProvider } from '@/app/context/LongPlanContext'
import DisplayLongTermTraining from './DisplayLongTermTraining'

type TrainingTypes = {
    trainingPlanData: BigTrainingStarter,
    progressions: Progression[]
}
export const Training = async ({trainingPlanData,progressions}:TrainingTypes) => {
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = await userExercisesThatRequireHandlesOrTimeMesure()
    // const exercisesObject = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    return(
        <main>
            <LongPlanContextProvider trainingPlanData={trainingPlanData}>
                <TimerContextProvider>
                    {/* <DisplayTraining 
                        trainingPlanData={trainingPlanData!}
                        exercisesObject={exercisesObject}
                        allExercisesInOneArray={allExercisesInOneArray}
                        allHandles={allHandles}
                        ExercisesThatRequireHandle={ExercisesThatRequireHandle}
                        ExercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure}
                        useremail={useremail}
                        progressions={progressions}
                        /> */}
                        <DisplayLongTermTraining 
                            allHandles={allHandles}
                        />
                    </TimerContextProvider>
            </LongPlanContextProvider>
        </main>
    )
}
