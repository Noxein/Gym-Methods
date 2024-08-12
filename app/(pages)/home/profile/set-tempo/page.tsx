import { getAllExercises, getAllTempos } from "@/app/actions";
import { SetTempo } from "@/app/components/profile/set-tempo/SetTempo";

export default async function page(){
    const exercises = await getAllExercises()
    const tempos = await getAllTempos()
    return(
        <SetTempo exercises={exercises} tempos={tempos}/>
    )
}