import { AllExercisesInOneArray, getAllExercises, getAllTempos } from "@/app/actions";
import { SetTempo } from "@/app/components/profile/set-tempo/SetTempo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tempo",
};

export default async function page(){
    const exercises = await getAllExercises()
    const tempos = await getAllTempos()
    const allExercisesInOneArray = await AllExercisesInOneArray()
    return(
        <SetTempo exercises={exercises} tempos={tempos} allExercisesInOneArray={allExercisesInOneArray}/>
    )
}