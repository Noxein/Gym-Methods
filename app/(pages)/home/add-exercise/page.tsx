import { ExerciseListMapped } from "@/app/components/add-exercise/ExerciseListMapped";
import { AddExercise } from "../../../components/AddExercise";
import { CenterComponent } from "../../../components/CenterComponent";
import { auth } from '@/auth'


export default async function AddExercisePage(){
    const session = await auth()
    return(
        <CenterComponent>
           <ExerciseListMapped />
        </CenterComponent>
    )
}