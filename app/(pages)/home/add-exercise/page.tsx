import { ExerciseListMapped } from "@/app/components/add-exercise/ExerciseListMapped";
import { AddExercise } from "../../../components/add-exercise/AddExercise";
import { CenterComponent } from "../../../components/CenterComponent";
import { auth } from '@/auth'


export default async function AddExercisePage(){

    return(
        <ExerciseListMapped />
    )
}