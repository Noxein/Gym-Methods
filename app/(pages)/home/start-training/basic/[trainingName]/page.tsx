import { AllExercisesInOneArray, getAllHandleTypes, getAllUserProgressions, getUserExercises, GetUserTrainingByName, userExercisesThatRequireHandlesOrTimeMesure } from "@/app/actions";
import { DisplayTraining } from "@/app/components/home/start-training/DisplayTraining";
import { ModalContextsProvider } from "@/app/components/home/start-training/ModalContexts";
import { TimerContextProvider } from "@/app/context/TimerContext";
import { exerciseList } from "@/app/lib/exercise-list";
import { ExerciseTypes } from "@/app/types";

export default async function page(props:{params: Promise<{trainingName:string}>}) {
    const params = await props.params;
    const decodedTrainingId = decodeURIComponent(params.trainingName)
    const trainingPlanData = await GetUserTrainingByName(decodedTrainingId)
    const planData = trainingPlanData.training
    const ExercisesThatRequireHandlesOrTimeMesure = await userExercisesThatRequireHandlesOrTimeMesure()
    const {ExercisesThatRequireHandle,ExercisesThatRequireTimeMesure} = ExercisesThatRequireHandlesOrTimeMesure
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allHandles = await getAllHandleTypes()
    const progressions = await getAllUserProgressions()
    const userExercises = await getUserExercises()

    const obj: ExerciseTypes = {...exerciseList,userExercises:userExercises}

    if(trainingPlanData.error){
        return(
            <div className="text-white">
                {trainingPlanData.error}
            </div>
        )
    }

    return(
        <main className="text-white">
            <TimerContextProvider>
                <ModalContextsProvider progressions={progressions} trainingName={planData!.trainingname}>
                    <DisplayTraining 
                        trainingPlanData={planData!}
                        ExercisesThatRequireHandle={ExercisesThatRequireHandle}
                        ExercisesThatRequireTimeMesure={ExercisesThatRequireTimeMesure}
                        allExercisesInOneArray={allExercisesInOneArray}
                        allHandles={allHandles}
                        exercisesObject={obj}
                        progressions={progressions}
                    />
                </ModalContextsProvider>
            </TimerContextProvider>
        </main>
    )
}