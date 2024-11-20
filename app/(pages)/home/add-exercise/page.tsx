import { AllExercisesInOneArray, getAllExercises } from "@/app/actions";
import { ExerciseListMapped } from "@/app/components/add-exercise/ExerciseListMapped";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dodaj ćwiczenie", 
};

export default async function AddExercisePage(){

    const exercises = await getAllExercises()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    return(
        <ExerciseListMapped exercises={exercises} allExercisesInOneArray={allExercisesInOneArray}/>
    )
}