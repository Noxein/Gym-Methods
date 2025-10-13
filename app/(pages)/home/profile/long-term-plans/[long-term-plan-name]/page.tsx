import { AllExercisesInOneArray, getAllExercises, getUserLongTrainigs, GetUserTrainings } from "@/app/actions"
import LongTermPlan from "@/app/components/profile/long-term-plans/long-term-plan-name/LongTermPlan"
import { LongPlanEditorProvider } from "@/app/context/LongPlanEditorContext"

export default async function page(){

    const UserTrainings = await GetUserTrainings()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    const allExercises = await getAllExercises()

    return  <LongPlanEditorProvider>
                <LongTermPlan UserTrainings={UserTrainings} allExercisesInOneArray={allExercisesInOneArray} allExercises={allExercises}/>
            </LongPlanEditorProvider>
}