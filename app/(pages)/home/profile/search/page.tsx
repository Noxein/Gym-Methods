import { AllExercisesInOneArray, getAllExerciseNamesInArray, getAllExercises } from "@/app/actions";
import { SearchPage } from "@/app/components/profile/search/SearchPage";

export default async function page(){
    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    
    return <SearchPage exerciseList={allExercisesInOneArray} exercises={exercises}/>
}